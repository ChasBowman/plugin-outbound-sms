import React from "react";
import { Card, Grid } from "@material-ui/core";

// import generic UX components
import SubheadingComponent from "./SubheadingComponent";

class GeneralView extends React.Component {
  render() {
    var frameContent =
      typeof this.props.crmUrl === "undefined" ? (
        <div style={styles.padded}>Error: No CRM URL variable passed from in the task attributes</div>
      ) : (
        <iframe src={this.props.crmUrl} title="Customer Record" height="98%" width="100%" />
      );

    return (
      <React.Fragment>
        <SubheadingComponent title={this.props.title} />
        <Card style={styles.card}>
          <Grid container >
            <Grid item xs={12} >
              {frameContent}
            </Grid>
          </Grid>
        </Card>
      </React.Fragment>
    );
  }
}

const styles = {
  padded: {
    padding: "20px",
    minWidth: 250,
    minHeight: "90%"
  },
  card: {
    display: "flex",
    minWidth: 250,
    minHeight: "90%",
    margin: "0 20px 20px 20px",
    textAlign: "left"
  },
  cover: {
    margin: "20px 0 20px 20px"
  },
  button: {
    margin: "10px",
    minWidth: "200px"
  },

};

export default GeneralView;
