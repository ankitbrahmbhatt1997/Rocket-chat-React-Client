import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#3f51b5",
      mainGradient: "linear-gradient(91.33deg, #60A9F6 0%, #2A8BF2 100%)",
    },
    secondary: {
      main: "#6FCF97",
    },
    secondPrimary: "linear-gradient(325.78deg, #2A8BF2 14.76%, #7CB8F7 87.3%)",

    common: {
      black: "#000",
      white: "#E5E5E5",
      grey: "#FAFBFF",
      yellow: "#FBD56F",
    },
    border: "rgba(112, 124, 151, 0.1)",
  },
  typography: {
    color: "#000000",
    subtitle1: {
      color: "#0D1C2E",
    },
    subtitle2: {
      textTransform: "capitalize",
    },
    caption: {
      color: "#949DB1",
    },
    h5: {
      color: "#949DB1",
      fontFamily: "Roboto",
      fontWeight: "bold",
      fontSize: "2rem",
      lineHeight: "2.1rem",
    },
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        body: {
          backgroundColor: "#fff",
        },
        html: {
          scrollBehavior: "smooth",
        },
      },
    },
  },
});

export default theme;
