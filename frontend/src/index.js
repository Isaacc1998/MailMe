import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureStore from "./store/store";
import * as sessionActions from "./store/session";
import * as mailinglistActions from "./store/mailinglist";
import * as postActions from "./store/posts";
import { ChakraProvider } from "@chakra-ui/react";
let store = configureStore({});

window.store = store;
window.sessionActions = sessionActions;
window.mailinglistActions = mailinglistActions;
window.postActions = postActions;

function Root() {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ChakraProvider>
    </Provider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById("root")
);
