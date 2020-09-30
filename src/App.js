import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Routes from "Routes";

import { ThemeProvider } from "@material-ui/core";
import theme from "theme";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { Provider as ReduxProvider } from "react-redux";
import store from "config/store";

function App() {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Routes />
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </ReduxProvider>
  );
}

export default App;
