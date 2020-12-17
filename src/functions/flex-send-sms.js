/*
    Simple utility function to send and SMS message
    
    Inputs:
    toNumber ==>  phone number of recipient
    fromNumber ==> Twilio Phone number sending message
    message ==> content of the SMS message
    
    URL:
    
    ACCESS CONTROL: Uncheck valid Twilio signature
*/

  const TokenValidator = require('twilio-flex-token-validator').functionValidator;

  exports.handler = TokenValidator(function(context, event, callback) {
      
    const client = context.getTwilioClient();
    let toNumber = event.toNumber;
    // the fromNumber could be hard coded instead of being recieved from the plugin.
    let fromNumber = event.fromNumber;
    // let fromNumber = '+XXXXXXXXXXX';
    
    //  perform error checking on toNumber
    toNumber = toNumber.trim();
    let pos = toNumber.indexOf("+");
    
    if (toNumber.indexOf('+') == -1) {
      toNumber = '+' + toNumber
    }    
      
    let msg = event.message;
    
    let response = new Twilio.Response();
      let headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
        "Access-Control-Allow-Headers": "Content-Type",
        "Content-Type": "application/json"
    };
    
    response.setHeaders(headers);    
    console.log('to: ' + toNumber + '  fromNumber:' + fromNumber +  '  msg: ' + msg);
    
    result = {};
    
    client.messages
      .create({
         body: msg,
         from: fromNumber,
         to: toNumber
       })
      .then(function(message) {
          console.log(message.sid);
          result = {"sid": message.sid};
            
            result = {"success" : "true", "data" : result}
            response.setBody(result);
            callback(null, response);          
          
      });
  
  });