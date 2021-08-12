import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";

//import AdminLayout from "layouts/Admin.js";
//import AuthLayout from "layouts/Auth.js";
import App from './views/App';

import './rsrc/fonts/DrSugiyama-Regular.ttf';
import './rsrc/fonts/EmblemaOne-Regular.ttf';

ReactDOM.render(
  <HashRouter>
   {/*<BrowserRouter> */}
    
      <Switch>
        <Route path="/" render={(props) => <App />} />
        <Redirect from="/" to="/#/" />
      </Switch>
   {/* </BrowserRouter> */}
   </HashRouter>,

    document.getElementById("root")
  
);