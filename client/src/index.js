import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

//import AdminLayout from "layouts/Admin.js";
//import AuthLayout from "layouts/Auth.js";
import App from './views/App';

ReactDOM.render(

    <BrowserRouter>
      <Switch>
        <Route path="/" render={(props) => <App />} />
        <Redirect from="/" to="/home" />
      </Switch>
    </BrowserRouter>,

    document.getElementById("root")
  
);