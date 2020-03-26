import { createMuiTheme, MuiThemeProvider, responsiveFontSizes } from '@material-ui/core/styles';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import deepPurple from '@material-ui/core/colors/deepPurple';
import amber from '@material-ui/core/colors/amber';

let theme = createMuiTheme({
    palette: {
        primary : deepPurple,
        secondary : amber
    },
    // typography: {
    //     fontFamily: "'Open Sans Condensed', sans-serif, 'Open Sans', sans-serif",
    // },
});

theme = responsiveFontSizes(theme);

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <App />
    </MuiThemeProvider>,
    document.getElementById('root')

);

