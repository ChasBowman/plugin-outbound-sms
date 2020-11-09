import React from "react";
import { Actions, Manager } from '@twilio/flex-ui';
import Fab from '@material-ui/core/Fab';

// import generic UX components
import InfoComponent from "./InfoComponent";
import SubheadingComponent from "./SubheadingComponent";

// import icons
import PhoneIcon from "@material-ui/icons/Phone";
import PersonIcon from "@material-ui/icons/Person";
import EmailIcon from "@material-ui/icons/Email";
import VpnKeyIcon from "@material-ui/icons/VpnKey";

class CustomerView extends React.Component {

  startCall() {
    console.log(`Running Start Call--> Phone: ${this.props.contactData.phone} Name: ${this.props.contactData.name}`);
    Actions.invokeAction("StartOutboundCall", {destination: `${this.props.contactData.phone}`, taskAttributes: {"type": "outbound", "name": `${this.props.contactData.name}`,   "crmid": `${this.props.contactData.crmid}`, "phone": `${this.props.contactData.phone}`, "email": `${this.props.contactData.email}`, "taskIntent": `${this.props.contactData.taskIntent}` } });
  }

  render() {    
    return (
       <React.Fragment>
        <SubheadingComponent title="Contact Details" />
        <div style={styles.card}>
          <InfoComponent title="Customer Id" value={this.props.contactData.crmid} icon={<VpnKeyIcon />} hr={true} />
          <InfoComponent title="Name" value={this.props.contactData.name} icon={<PersonIcon />} hr={true} />
          <InfoComponent title="Email" value={this.props.contactData.email} icon={<EmailIcon />} hr={true} />
          <InfoComponent title="Phone" value={this.props.contactData.phone} icon={<PhoneIcon />} hr={true} />
          <Fab variant="extended" size="small" style={styles.button} aria-label="SMS Notification" onClick={e => this.startCall()}  >
            Call Contact
          </Fab><br />
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
  }
};

export default CustomerView;
