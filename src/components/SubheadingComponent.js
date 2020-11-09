import React from "react";

class SubheadingComponent extends React.Component {
  constructor(props) {
    super(props);

    var backgroundColor = localStorage.getItem("fte-main-header-background-color");
    var bgcolor = backgroundColor === null || typeof backgroundColor === "undefined" ? "#0233a0" : backgroundColor;

    var fontColor = localStorage.getItem("fte-main-header-text-color");
    var txtcolor = fontColor === null || typeof fontColor === "undefined" ? "#FFF" : fontColor;

    this.state = {
      bgColor: bgcolor,
      txtColor: txtcolor
    };
  }

  render() {
    const styles = {
      container: {
        padding: 10,
        margin: "0 20px 0px 20px",
        borderRadius: "13px 13px 0px 0px",
        fontfamily: "Open Sans",
        fontSize: "12px",
        fontWeight: "bold",
        fontStyle: "normal",
        fontStretch: "normal",
        lineHeight: 1.67,
        letterSpacing: "1px",
        textTransform: "uppercase",
        backgroundColor: this.state.bgColor,
        color: this.state.txtColor,
        textAlign: "left"
      }
    };
    return <React.Fragment>{this.state && this.state.bgColor && this.state.txtColor && <div style={styles.container}>{this.props.title}</div>}</React.Fragment>;
  }
}

export default SubheadingComponent;
