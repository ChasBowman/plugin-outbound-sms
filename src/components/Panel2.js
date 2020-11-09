import React from "react";
import { Grid } from "@material-ui/core";
import * as Flex from "@twilio/flex-ui";
//import { withTaskContext } from '@twilio/flex-ui';
import CustomerView from "./CustomerView";
import SmsView from "./SmsView";
import GeneralView from "./GeneralView";
import OfferView from "./OfferView";


class Panel2Component extends React.Component {
  constructor(props) {
    super(props);
    this.init();
    this.state = {
      taskIntent: null,
      taskSid: null,
      contactData: null,
      crmurl: null,
      offer: null,
    };
  }

  init = () => {

    Flex.Actions.registerAction("setCustomer", async payload => {
      if (!payload.task) {
        this.setState({ taskSid: null, crmId: null, taskIntent: null, contactData: null, crmurl: null, offer: null });
        return;

      } else {
        const taskSid = (await payload.task) !== null ? payload.task.taskSid : null;
        const taskIntent = (await payload.task) !== null ? payload.task.attributes.taskIntent : null;
        const crmurl = (await payload.task) !== null ? payload.task.attributes.crmurl : 'https://www.jetbluevacations.com/deals';
        // Map task.attributes.crmid to Contact Details - Customer ID
        const crmId = (await payload.task) !== null ? payload.task.attributes.crmid : null;
        // Map task.attributes.name to Contact Card and Name Fields
        const name = (await payload.task) !== null ? payload.task.attributes.name : null;
        // Map task.attributes.phone to Phone Fields
        const phone = (await payload.task) !== null ? payload.task.attributes.from : null;
        // Map task.attributes.email to Contact Details - Email
        const email = (await payload.task) !== null ? payload.task.attributes.email : null;
        const address = (await payload.task) !== null ? payload.task.attributes.crmAddress : null;
        const dnis = (await payload.task) !== null ? payload.task.attributes.dnis : null;
        const channelType = (await payload.task) !== null ? payload.task.attributes.channelType : null;
        let offer = {};
        
        // Call Function
        // Set the query for the Twilio Funciton
        const functionQuery = { 
          phone: phone,
          Token: this.props.manager.store.getState().flex.session.ssoTokenPayload.token
        };
        // Set the HTTP Option for the Twilio Function call
        const options = {
          method: 'POST',
          body: new URLSearchParams(functionQuery),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
          }
        };
        // Make the function call using Fetch
        console.log('Running Get Offer Funciton');
        await fetch('https://fandango-dinosaur-4080.twil.io/get-offer', options)
          .then(resp => resp.json())
          .then(resp => this.setState({ offer: resp}))
        console.log("logging offer after fetch");
        offer = this.state.offer;
        console.log(offer);
        var contactData = {
          crmid: crmId,
          name: name,
          phone: phone,
          email: email,
          address: address,
          dnis: dnis,
          taskIntent: taskIntent,
          offer: offer,
          channelType: channelType
        };
        this.setState({ taskIntent, taskSid, contactData, crmurl });
      }
    });
  };


  render() {

    let layout = null;

    if (this.state.taskSid && this.state.contactData != null) {
      var viewData = (
            <React.Fragment>
              <OfferView contactData={this.state.contactData} />
              {/* <GeneralView title="Details" crmUrl={this.state.crmurl} /> */}
            </React.Fragment>
          );

      layout = (
        <div style={styles.panel2Container}>
          <Grid container style={styles.column} spacing={0}>
            <Grid item xs={12} md={3}>
              <div style={styles.padded}>
                <CustomerView contactData={this.state.contactData} />
                <SmsView contactData={this.state.contactData} manager={this.props.manager}/>
              </div>
            </Grid>
            <Grid item xs={12} md={9}>
              {viewData}
            </Grid>
          </Grid>
        </div>
      );
    } else {
      var viewData = (
        <React.Fragment> 
          <GeneralView title="General" crmUrl="https://www.jetbluevacations.com/deals" />
        </React.Fragment> 
      );

      layout = (
        <div style={styles.panel2Container}>
          {/* <Grid container style={styles.column} spacing={0}>
            <Grid item xs={12} md={12}>
              {viewData}
            </Grid>
          </Grid> */}
        </div>
      );
    }
    return layout;
  }
}

const styles = {
  panel2Container: {
    position: "center",
    background: "no-repeat center",
    backgroundSize: "cover",
    backgroundImage: "url(https://www.jetbluevacations.com/cdn-cgi/image/f=auto,width=1920,height=1080/https://cms.jetbluevacations.com/vacations-cms/dam/jcr:608ed420-0b4c-4da3-a5e8-c2a924e748d4/BB-Nov-Puj_NEW.jpg)",
    backgroundColor: "#eee",
    height: "100%",
    borderLeft: "1px solid #d0d0d0"
  },
  noTaskLogo: {
    content: '""',
    position: "cover",
    background: "no-repeat center",
    backgroundSize: "500px",
    backgroundImage: "url(https://www.jetbluevacations.com/cdn-cgi/image/f=auto,width=1920,height=1080/https://cms.jetbluevacations.com/vacations-cms/dam/jcr:608ed420-0b4c-4da3-a5e8-c2a924e748d4/BB-Nov-Puj_NEW.jpg)",
    backgroundColor: "#eee",
    height: "90%",
    borderLeft: "1px solid #d0d0d0",
    // opacity: ".6"
  },
  page: {
    border: "1px solid #ddd"
  },
  column: {
    height: "100%",
    textAlign: "center",
    verticalAlign: "center",
    borderLeft: "1px solid #294880",
    padding: 20
  },
  padded: {
    marginRight: "20px"
  }
};

export default Panel2Component;
