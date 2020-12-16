// import { urlencoded } from "body-parser";

export default {
  baseName: "FlexLight",
  colors: {
    base0: "#1d55a4"
  },
  overrides: {
    SideNav: {
      Container: {
        background: "#1d55a4"
      },
      Button: {
        background: "#1d55a4"
      }
    },
    MainHeader: {
      Container: {
        background: "#1d55a4", // MainHeader menu backgroun
        backgroundColor: "#1d55a4", // MainHeader color
        color: "#fff", // Flex Logo Color
        ".Twilio-UserControls": {
          width: "46px",
          ".Twilio-UserCard-InfoContainer": {
            display: "none"
          }
        },
        "@media screen and (min-width: 1000px)": {
          height: "45px",
          backgroundSize: "contain",
          backgroundImage: `url(https://sangria-mayfly-5000.twil.io/assets/geico_logo.png)`,
          backgroundPosition: "center center, center center, right center",
          backgroundRepeat: "no-repeat"
        },
        "@media screen and (max-width: 999px)": {
          height: "45px",
          backgroundSize: "contain",
          backgroundImage: `url(https://sangria-mayfly-5000.twil.io/assets/g_logo.png)`,
          backgroundPosition: "center center, center center",
          backgroundRepeat: "no-repeat"
        }
      },
      Button: {
        color: "#fff", // Right side button colors
        lightHover: true
      }
    }
  }
};
