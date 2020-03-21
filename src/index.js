import { createMuiTheme, MuiThemeProvider, responsiveFontSizes } from '@material-ui/core/styles';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

let theme = createMuiTheme({
    palette: {
        primary : {
            light : "#E00087",
            main : "#C60078",
            dark : "#A00061"
        },
        secondary: {
            light : "#448CCB",
            main : "#3B7AB1",
            dark : "#2F608B"
        }
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

serviceWorker.unregister();
