import React from 'react';
// import { VERSION } from '@twilio/flex-ui';
import { FlexPlugin } from 'flex-plugin';
import Panel2 from './components/Panel2';
import JTPTheme from './JTPTheme';

const PLUGIN_NAME = 'JTPByBluePluginJ';

export default class JTPByBluePlugin extends FlexPlugin {
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

    const configuration = {
      colorTheme: JTPTheme
    };
    manager.updateConfig(configuration);

    manager.strings.TaskInfoPanelContent = `
    <h1>CUSTOMER CONTEXT</h1>
    <h2>Customer name / phone number</h2>
    <p>{{task.attributes.name}} / {{task.attributes.from}}</p>
    <hr />
    <h1>Task Informaiton</h1>
    <h2>Task created on</h2>
    <p>{{task.dateCreated}}</p>
    <h2>Task priority</h2>
    <p>{{task.priority}}</p>
    <h2>Task queue</h2>
    <p>{{task.taskQueueName}}</p>
    <hr />
    `;

    flex.AgentDesktopView.defaultProps.splitterOptions = { initialFirstPanelSize: "400px", minimumFirstPanelSize: "400px" };
    
    flex.Actions.addListener("afterAcceptTask", payload => {
      return flex.Actions.invokeAction("setCustomer", payload);
    });
    flex.Actions.addListener("afterSelectTask", payload => {
      return flex.Actions.invokeAction("setCustomer", payload);
    });
    flex.Actions.addListener("afterCompleteTask", payload => {
      return flex.Actions.invokeAction("setCustomer", {});
    });
    
    // Replace Panel 2 with Custom Componenet 
    flex.AgentDesktopView.Panel2.Content.replace(<Panel2 key="panel2" manager={manager} />);

  }
}
