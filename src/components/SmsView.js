import React from "react";
import { Actions, Manager } from '@twilio/flex-ui';
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';

// import generic UX components
import InfoComponent from "./InfoComponent";
import SubheadingComponent from "./SubheadingComponent";

// import icons
import PhoneIcon from "@material-ui/icons/Phone";
import PersonIcon from "@material-ui/icons/Person";



class SmsView extends React.Component {

  state = { 
		smsBody: '', 
	} 
 
	handleChange = (e) => this.setState({ 
		smsBody: e.target.value 
	}) 

  startNotification(smsMessage) {
    console.log(`Running SMS Contact--> ${smsMessage}`);
    console.log(this.props.manager);
    // Call Function  -----------------------------
      // Set the query for the Twilio Funciton
      const functionQuery = { 
        toNumber: this.props.contactData.phone,
        fromNumber: '+14422222283',
        message: smsMessage,
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
      fetch('https://fandango-dinosaur-4080.twil.io/send-sms', options)
        .then(resp => resp.json())
        .then(resp => {
          console.log("SMS Sent");
          alert(`SMS Message has been sent to ${this.props.contactData.phone}. \r\nMessage: ${smsMessage}`);
          this.setState({ smsBody: ''});
        })
  }

  render() { 
    
    let channelType = this.props.contactData.channelType;
    if (channelType === "sms") {
      return (null);
    }
    return (
       <React.Fragment>
        <SubheadingComponent title="Send SMS" />
        <div style={styles.card}>
          <InfoComponent title="Name" value={this.props.contactData.name} icon={<PersonIcon />} hr={true} />
          <InfoComponent title="Phone" value={this.props.contactData.phone} icon={<PhoneIcon />} hr={true} />
          <TextField
            id='Message'
            label='Message'
            multiline
            rows='5'
            style={styles.textInput}
            value={this.state.smsBody}
            onChange={this.handleChange}
            margin='normal'
            variant='outlined'
          />
          <Fab variant="extended" size="small" style={styles.button} aria-label="SMS Notification" onClick={e => this.startNotification(this.state.smsBody)} >
            Send SMS
          </Fab>
        </div>
      </React.Fragment>
    );
  }
}

const styles = {
  card: {
    background: "#fff",
    padding: 20,
    minWidth: 150,
    margin: "0 20px 20px 20px",
    border: "1px solid #d0d0d0",
    borderTop: "none"
  },
  button: {
    color: "#fff",
    backgroundColor: "#1976d2",
    textTransform: "uppercase",
    minWidth: "175px",
    margin: "10px 10px 0 0"
  },
  textInput: {
    width: "100%"
  }
};

export default SmsView;
