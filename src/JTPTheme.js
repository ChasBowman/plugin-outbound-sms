// import { urlencoded } from "body-parser";

export default {
  baseName: "FlexLight",
  // colors: {
  //   base0: "#0057c0"
  // },
  overrides: {
    SideNav: {
      Container: {
        background: "#0233a0"
      },
      Button: {
        background: "#0233a0"
      }
    },
    MainHeader: {
      Container: {
        background: "#fff",
        backgroundColor: "#fff",
        color: "#000",
        ".Twilio-UserControls": {
          width: "46px",
          ".Twilio-UserCard-InfoContainer": {
            display: "none"
          }
        },
        "@media screen and (min-width: 960px)": {
          height: "45px",
          backgroundSize: "300px",
          backgroundImage: `url(https://fandango-dinosaur-4080.twil.io/assets/headerlogo.png)`,
          backgroundPosition: "center center, center center, right center",
          backgroundRepeat: "no-repeat"
        },
        "@media screen and (min-width: 640px) and (max-width: 959px)": {
          height: "45px",
          backgroundSize: "300px",
          backgroundImage: `url(https://fandango-dinosaur-4080.twil.io/assets/headerlogo.png)`,
          backgroundPosition: "center center, center center, right center",
          backgroundRepeat: "no-repeat"
        },
        "@media screen and (max-width: 639px)": {
          height: "45px",
          backgroundSize: "300px",
          backgroundImage: `url(https://fandango-dinosaur-4080.twil.io/assets/headerlogo.png)`,
          backgroundPosition: "center center, center center",
          backgroundRepeat: "no-repeat"
        }
      },
      Button: {
        color: "#000",
        lightHover: true
      }
    }
  }
};
