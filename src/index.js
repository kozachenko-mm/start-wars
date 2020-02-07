import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route } from "react-router-dom";
import './stylesheet/main.css'
import App from "./components/App/App";


ReactDOM.render(
  <HashRouter basename="/">
    <Route component={App} />
  </HashRouter>,
  document.getElementById("root")
);
