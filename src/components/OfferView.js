import React from "react";
//import { Actions, Manager } from '@twilio/flex-ui';

// import generic UX components
import InfoComponent from "./InfoComponent";
import SubheadingComponent from "./SubheadingComponent";

// import icons
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import CommuteIcon from '@material-ui/icons/Commute';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import CategoryIcon from '@material-ui/icons/Category';

class CustomerView extends React.Component {

  render() {    
    return (
       <React.Fragment>
        <SubheadingComponent title="Offer Details" />
        <div style={styles.card}>
          <InfoComponent title="Offer Id" value={this.props.contactData.offer.orderId} icon={<VpnKeyIcon />} hr={true} />
          <InfoComponent title="Vendor" value={this.props.contactData.offer.vendor} icon={<CommuteIcon />} hr={true} />
          <InfoComponent title="Pickup Location" value={this.props.contactData.offer.pickUpLocation.code} icon={<LocationOnIcon />} hr={true} />
          <InfoComponent title="Rate Total" value={this.props.contactData.offer.rateTotalAmount} icon={<AttachMoneyIcon />} hr={true} />
          <InfoComponent title="Vehicle Cagegory" value={this.props.contactData.offer.vehicleCategory} icon={<CategoryIcon />} hr={true} />
          <InfoComponent title="Vehicle Class" value={this.props.contactData.offer.vehicleClass} icon={<CommuteIcon />} hr={true} />
          <InfoComponent title="Vehicle Make and Model" value={this.props.contactData.offer.vehicleMakeModelName} icon={<CommuteIcon />} hr={true} />
          <img src={this.props.contactData.offer.vehiclePictureURL} alt="Rental Cal" height="250"></img>
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
