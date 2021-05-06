import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { createStore} from 'redux';
import rootReducer from '../src/reducer';
import { Provider } from 'react-redux';

const theme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      main: "#ffffff",
      dark: "#484848",
      light: "#cacaca",
    },
    secondary: {
      main: "#212121",
      dark: "#484848",
    },
  },
  typography: {
    fontFamily: "Poppins",
  },
});
const store = createStore(rootReducer);
ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
    <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
