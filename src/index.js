import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./plain";

import App from "./App";
import App2 from "./App2";


const mounts = {
  app: App,
  app2: App2,
  nisse: App
};

for (const [key, Comp] of Object.entries(mounts)) {
  const elem = document.getElementById(key);
  if(!elem) {
    continue;
  }

  const props = Object.assign({}, elem.dataset);
  ReactDOM.render(
    <Provider store={store}>
      <Comp {...props} />
    </Provider>,
    document.getElementById(key)
  );
}

module.hot.accept();
