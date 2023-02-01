import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "redux/store";
import { BrowserRouter } from "react-router-dom";
import { checkAuth } from "redux/user/thunk";
import App from "./App";
import "./index.css";

const container = document.getElementById("root");
const root = createRoot(container);

async function startApp() {
  try {
    await store.dispatch(checkAuth());
  }
   finally {
    root.render(
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    );
   }
}

startApp();
