import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import './stylesheet/main.css'
import App from "./components/App/App";


ReactDOM.render(
  <BrowserRouter basename="/">
    <Route component={App} />
  </BrowserRouter>,
  document.getElementById("root")
);
