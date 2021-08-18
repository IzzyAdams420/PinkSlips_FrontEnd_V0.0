import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";

import ScrollToTop from "./functions/ScrollToTop.js";

import App from './views/App';

import './rsrc/fonts/DrSugiyama-Regular.ttf';
import './rsrc/fonts/EmblemaOne-Regular.ttf';

ReactDOM.render(
  <HashRouter>
   {/*<BrowserRouter> */}
    <ScrollToTop />
      <Switch>
        <Route path="/" render={(props) => <App />} />
        <Redirect from="/" to="/#/" />
      </Switch>
   {/* </BrowserRouter> */}
   </HashRouter>,

    document.getElementById("root")
  
);