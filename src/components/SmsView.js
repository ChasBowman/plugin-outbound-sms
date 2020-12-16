import React from "react";
import { Actions, Manager } from '@twilio/flex-ui';
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';
import { withTaskContext } from '@twilio/flex-ui';

// import generic UX components
import InfoComponent from "./InfoComponent";
import SubheadingComponent from "./SubheadingComponent";

// import icons
import PhoneIcon from "@material-ui/icons/Phone";
import PersonIcon from "@material-ui/icons/Person";



class SmsView extends React.Component {
  constructor(props) {
    super(props);
    this.startNotification = this.startNotification.bind(this);
    this.startChat = this.startChat.bind(this);
  }

  state = { 
    smsBody: '',
    toNumber: '',
    fromNumber: '+16306347877', 
    name: 'Customer'
  } 
  
  
  componentDidMount() {
    if (this.props.task && this.props.task.attributes) { 
    const { dnis, from, name } = this.props.task.attributes;
    this.setState({ toNumber: from, fromNumber: dnis, name: name })
    }
  }

	handleChange = (field, e) => this.setState({ 
		[field]: e.target.value 
	}) 

  startNotification() {
    console.log(`Running SMS Contact--> ${this.state.smsBody}`);
    console.log(this.props.manager);
    // Call Function  -----------------------------
    // Set the query for the Twilio Funciton
    const functionQuery = { 
      toNumber: this.state.toNumber,
      fromNumber: this.state.fromNumber,
      message: this.state.smsBody,
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
    fetch('https://charcoal-trout-2362.twil.io/flex-send-sms', options)
      .then(resp => resp.json())
      .then(resp => {
        console.log("SMS Sent");
        alert(`SMS Message has been sent to ${this.state.fromNumber}. \r\nMessage: ${this.state.smsBody}`);
        this.setState({ smsBody: ''});
      })
  }

  startChat(task) {
    console.log(`Running Start Chat--> toNumber: ${this.state.toNumber} fromNumber: ${this.state.fromNumber}`);
    // console.log(this.state);
    // console.log(task);
    
    const name = (this.state.name) !== "" ? this.state.name : this.state.toNumber;
    const smsURL = `https://charcoal-trout-2362.twil.io/flex-sms-chat?fromNumber=${encodeURIComponent(this.state.fromNumber)}&toName=${encodeURIComponent(name)}&toNumber=${encodeURIComponent(this.state.toNumber)}}`;
    console.log('URL: ' + smsURL);
    fetch(smsURL)
      .then(result => result.json())
      .then(result => {
        console.log("Chat Started");
      });
  }

  render() { 

    console.log("Running CustomerView");

    if (this.props.task && this.props.task.attributes) { 
      if (this.props.task.channelType === "sms") return (null);
      let {
			  workflowName,
			  queueName,
        taskSid,
        channelType
      } = this.props.task;
      let {
			  name,
			  ani,
        dnis,
        from,
			  email,
        address,
        crmid,
			  crmurl,
			  taskIntent
      } = this.props.task.attributes

      console.log("Channel Type: ", channelType);
      console.log("Task: ");
      console.log(this.props.task);
    }
    
    return (
       <React.Fragment>
         <div style={styles.panel3Container}>
        <SubheadingComponent title="Send SMS" />
        <div style={styles.card}>
          <InfoComponent title="Name" value={name} icon={<PersonIcon />} hr={true} />
          {/* <InfoComponent title="Customer Phone" value={from} icon={<PhoneIcon />} hr={true} /> */}
          {/* <InfoComponent title="Send SMS From" value={dnis} icon={<PhoneIcon />} hr={true} /> */}
          <TextField
            id='Twilio Number'
            label='Twilio Number'
            style={styles.textInput}
            value={this.state.fromNumber}
            onChange={(e) => this.handleChange("fromNumber", e)}
            margin='normal'
            variant='outlined'
          />
          <TextField
            id='Customer Phone Number'
            label='Customer Phone Number'
            style={styles.textInput}
            value={this.state.toNumber}
            onChange={(e) => this.handleChange("toNumber", e)}
            margin='normal'
            variant='outlined'
          />
          <TextField
            id='Message'
            label='Message'
            multiline
            rows='5'
            style={styles.textInput}
            value={this.state.smsBody}
            onChange={(e) => this.handleChange("smsBody", e)}
            margin='normal'
            variant='outlined'
          />
          <Fab variant="extended" size="small" style={styles.button} aria-label="SMS Notification" onClick={this.startNotification} >
            Send SMS
          </Fab>
          <Fab variant="extended" size="small" style={styles.button} aria-label="SMS Chat" onClick={e => this.startChat(this.props.task)} >
            New SMS Chat
          </Fab>
        </div>
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
    minWidth: "100px",
    margin: "10px 10px 0 0"
  },
  textInput: {
    width: "100%"
  },
  panel3Container: {
    boxShadow: 'inset 5px -1px 5px rgb(134 134 134 / 25%)',
    minHeight: 300,
    overflow: 'auto',
    height: '100%',
    width: 400,
    position: 'relative',
  }
};

export default withTaskContext(SmsView);
