import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

//import AdminLayout from "layouts/Admin.js";
//import AuthLayout from "layouts/Auth.js";
import App from './views/App';

ReactDOM.render(

    <HashRouter>
      <Switch>
        <Route path="/" render={(props) => <App />} />
        <Redirect from="/" to="/home" />
      </Switch>
    </HashRouter>,

    document.getElementById("root")
  
);