/*
    Reference: https://github.com/trogers-twilio/function-create-direct-to-task-sms-chat
    
    Inputs:
        fromNumber
        toName
        toNumber
        workerUri
        message
        Token

    ACCESS CONTROL: Uncheck valid Twilio signature
*/
const Twilio = require('twilio')
const nodeFetch = require('node-fetch')
const { URLSearchParams } = require('url')
const { v1: uuidv1 } = require('uuid')
const { Base64 } = require('js-base64')
const TokenValidator = require('twilio-flex-token-validator').functionValidator

exports.handler = TokenValidator(async function (context, event, callback) {
  const client = new Twilio(context.ACCOUNT_SID, context.AUTH_TOKEN)

  const verifyEventProps = (event) => {
    const result = {
      success: false,
    }

    console.log(event)
    const { fromNumber, toName, toNumber, workerUri, message } = event

    if (!fromNumber) {
      result.message = "Missing 'fromNumber' in request body"
    } else if (!toName) {
      result.message = "Missing 'toName' in request body"
    } else if (!toNumber) {
      result.message = "Missing 'message' in request body"
    } else if (!message) {
      result.message = "Missing 'toNumber' in request body"
    } else {
      result.success = true
    }

    return result
  }

  const getFlexFlow = async (fromNumber) => {
    try {
      flexFlows = await client.flexApi.flexFlow.list()

      if (!flexFlows || flexFlows.length === 0) {
        console.error('No Flex flows returned from fetch request')
        return null
      }

      let flexFlow
      for (let i = 0; i < flexFlows.length; i++) {
        const flow = flexFlows[i]
        console.log(JSON.stringify(flow))
        if (flow.contactIdentity === fromNumber && flow.integrationType === 'task') {
          flexFlow = flow
          break
        }
      }
      console.log('found flex flex', JSON.stringify(flexFlow))
      return flexFlow
    } catch (error) {
      console.error('Error creating chat channel.', error)
      return error
    }
  }

  const createChatChannelWithTask = async (
    flexFlowSid,
    identity,
    toNumber,
    toName,
    fromNumber,
    workerUri,
  ) => {
    const taskAttributes = {
      to: fromNumber,
      direction: 'outbound',
      name: toName,
      from: toNumber,
      targetWorker: workerUri,
      autoAnswer: true,
      taskIntent: `SMS Chat to ${toName}`,
    }
    try {
      const newChatChannel = await client.flexApi.channel.create({
        flexFlowSid: flexFlowSid,
        identity: identity,
        chatUserFriendlyName: toName,
        chatFriendlyName: `SMS${toNumber}`,
        target: toNumber,
        taskAttributes: JSON.stringify(taskAttributes),
      })
      console.log('created chat channel', JSON.stringify(newChatChannel))
      return newChatChannel
    } catch (error) {
      console.error('Error creating chat channel.', JSON.stringify(error))
      return error
    }
  }

  const createChatMessage = async (chatServiceSid, chatChannelSid, body) => {
    console.log(`running createChatMessage ${chatChannelSid} ${chatServiceSid} ${body}`)
    const messageResources = { body, xTwilioWebhookEnabled: true }
    try {
      const chatMessage = await client.chat
        .services(chatServiceSid)
        .channels(chatChannelSid)
        .messages.create(messageResources)
      console.log('sent message: ' + JSON.stringify(chatMessage))
      return chatMessage
    } catch (error) {
      console.error('Error adding message.', error)
      return error
    }
  }

  const createProxySession = async (
    proxyServiceSid,
    chatChannelSid,
    toNumber,
    toName,
    fromNumber,
  ) => {
    try {
      const participants = [
        {
          Identifier: toNumber,
          ProxyIdentifier: fromNumber,
          FriendlyName: toName,
        },
        {
          Identifier: chatChannelSid,
          ProxyIdentifier: fromNumber,
          FriendlyName: toName,
        },
      ]
      proxySession = await client.proxy.services(proxyServiceSid).sessions.create({
        uniqueName: chatChannelSid,
        mode: 'message-only',
        participants: JSON.stringify(participants),
      })
      console.log('created proxy session', JSON.stringify(proxySession))
      return proxySession
    } catch (error) {
      console.error('Error creating proxy session.', error)
      return reject(error)
    }
  }

  console.log('Received event with properties:')
  Object.keys(event).forEach((key) => {
    console.log(`--${key}:`, event[key])
  })

  const response = new Twilio.Response()
  response.appendHeader('Access-Control-Allow-Origin', '*')
  response.appendHeader('Access-Control-Allow-Methods', 'OPTIONS, POST, GET')
  response.appendHeader('Content-Type', 'application/json')
  response.appendHeader('Access-Control-Allow-Headers', 'Content-Type')

  const eventCheck = verifyEventProps(event)
  if (!eventCheck.success) {
    console.log('Event property check failed.', eventCheck.message)
    response.setStatusCode(400)
    response.setBody({ status: 400, message: eventCheck.message })
    return callback(null, response)
  }

  const { fromNumber, toName, toNumber, workerUri } = event
  const responseBody = {}
  let flexFlow
  try {
    flexFlow = await getFlexFlow(fromNumber)
  } catch (error) {
    response.setStatusCode(error && error.status)
    responseBody.error = error
    response.setBody(responseBody)
    return callback(null, response)
  }

  const chatServiceSid = flexFlow.chatServiceSid
  const flexFlowSid = flexFlow.sid
  console.log(`Matching flow chat service SID: ${chatServiceSid} flex flow SID: ${flexFlowSid}`)

  const identity = uuidv1()

  let chatChannel
  try {
    chatChannel = await createChatChannelWithTask(
      flexFlowSid,
      identity,
      toNumber,
      toName,
      fromNumber,
      workerUri,
    )
  } catch (error) {
    response.setStatusCode(error && error.status)
    responseBody.error = error
    response.setBody(responseBody)
    return callback(null, response)
  }

  responseBody.chatChannel = { identity }
  Object.keys(chatChannel).forEach((key) => {
    if (key === '_version' || key === '_solution' || key === '_context') {
      return
    }
    responseBody.chatChannel[key] = chatChannel[key]
  })

  let proxySession
  try {
    proxySession = await createProxySession(
      context.TWILIO_PROXY_SERVICE_SID,
      chatChannel.sid,
      toNumber,
      toName,
      fromNumber,
    )
  } catch (error) {
    response.setStatusCode(error && error.status)
    responseBody.error = error
    response.setBody(responseBody)
    return callback(null, response)
  }

  responseBody.proxySession = {}
  Object.keys(proxySession).forEach((key) => {
    if (key === '_version' || key === '_solution' || key === '_context') {
      return
    }
    responseBody.proxySession[key] = proxySession[key]
  })

  let chatMessage
  try {
    console.log(
      'starting createChatMessage ' + chatServiceSid + ' ' + chatChannel.sid + ' ' + event.message,
    )
    chatMessage = await createChatMessage(chatServiceSid, chatChannel.sid, event.message)
  } catch (error) {
    console.log('error creating chat message ' + JSON.stringify(error))
    response.setStatusCode(error && error.status)
    responseBody.error = error
    response.setBody(responseBody)
    return callback(null, response)
  }

  response.chatMessage = {}
  Object.keys(chatMessage).forEach((key) => {
    if (key === '_version' || key === '_solution' || key === '_context') {
      return
    }
    responseBody.chatMessage[key] = chatMessage[key]
  })

  response.setBody(responseBody)
  return callback(null, response)
})
