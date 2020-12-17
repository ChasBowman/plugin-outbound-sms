import React from "react";
import { withTheme } from '@twilio/flex-ui';


class SubheadingComponent extends React.Component {
  constructor(props) {
    super(props);
    console.log('Current theme: ', this.props.theme);

    let defaultBackground = this.props.theme.SideNav.Container.background;
    if (props.bgColor) defaultBackground = props.bgColor
    
    const bgColor = 
      localStorage.getItem('fte-main-header-background-color') ?? 
      defaultBackground

    const txtColor =
      localStorage.getItem('fte-main-header-text-color') ??
      this.props.theme.SideNav.Button.color

    this.state = {
        bgColor,
        txtColor,
      }
  }

  render() {  

    const styles = {
      container: {
        padding: 10,
        margin: "0 20px 0px 20px",
        fontSize: "12px",
        fontWeight: "bold",
        fontStyle: "normal",
        fontStretch: "normal",
        lineHeight: 1.5,
        letterSpacing: "2px",
        textTransform: "uppercase",
        backgroundColor: this.state.bgColor,
        color: this.state.txtColor,
        textAlign: "left"
      },
      containerRounded: {
        padding: 10,
        margin: "0 20px 0px 20px",
        borderRadius: "13px 13px 0px 0px",
        fontSize: "12px",
        fontWeight: "bold",
        fontStyle: "normal",
        fontStretch: "normal",
        lineHeight: 1.5,
        letterSpacing: "2px",
        textTransform: "uppercase",
        backgroundColor: this.state.bgColor,
        color: this.state.txtColor,
        textAlign: "left"
      }
    };
    
    const containerStyle = 
      this.props.type === 'rounded'? styles.containerRounded : styles.container;
    return ( 
      <React.Fragment>
        {<div style={containerStyle}>{this.props.title}</div>}
      </React.Fragment>
    )
  }
}

export default withTheme(SubheadingComponent);
