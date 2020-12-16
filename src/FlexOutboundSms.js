import React from 'react';
import { FlexPlugin } from 'flex-plugin';
import SmsView from './components/SmsView';


const PLUGIN_NAME = 'FlexOutboundSms';

export default class FlexOutboundSms extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   * @param manager { import('@twilio/flex-ui').Manager }
   */
  init(flex, manager) {

    console.log('--- Running FlexOutboundSms ---');
    console.log(manager);

    // Adding SMS View to panel3
    flex.AgentDesktopView.Content.add(
      <SmsView key="SmsView-panel3" label="Sms" flex={flex} manager={manager} inPanel3/>);

    //auto-accepts tasks
    manager.workerClient.on('reservationCreated', reservation => {
      if (reservation.task.attributes.autoAnswer === true || reservation.task.attributes.autoAnswer === 'true') {
        flex.Actions.invokeAction('AcceptTask', {sid: reservation.sid});
        //select the task
        flex.Actions.invokeAction('SelectTask', {sid: reservation.sid});
      }
    });

  }
}
