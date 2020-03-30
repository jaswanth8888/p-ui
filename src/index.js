import {
  createMuiTheme,
  MuiThemeProvider,
  responsiveFontSizes
} from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import App1 from "./App1"
import App2 from "./App2"
import deepPurple from "@material-ui/core/colors/deepPurple";
import amber from "@material-ui/core/colors/amber";
import "./i18n";

let theme = createMuiTheme({
  palette: {
    primary: deepPurple,
    secondary: amber
  }
  // typography: {
  //     fontFamily: "'Open Sans Condensed', sans-serif, 'Open Sans', sans-serif",
  // },
});

theme = responsiveFontSizes(theme);
let isvendor=false
ReactDOM.render(
  <Suspense fallback={<div>Loading</div>}>
    <MuiThemeProvider theme={theme}>
    <App2></App2>

    </MuiThemeProvider>
  </Suspense>,
  
  document.getElementById("root")
);
