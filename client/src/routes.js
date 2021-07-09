import React from 'react';
import MintingDesk from './pages/MintingDesk.js';
import AboutBadges from './pages/AboutBadges.js';
import BadgeSearch from './pages/Badge_Search.js';
import SamplePage from "./pages/samplepage.js";

var routes = [
 
  {
    path: "/MintingDesk/",
    name: "Minting Desk",
    component: MintingDesk,
    layout: "/home",
  },
  {
    path: "/AboutBadges/",
    name: "About Badges",
    component: AboutBadges,
    layout: "/home",
  },
  {
    path: "/Search/",
    name: "Badge Search",
    component: BadgeSearch,
    layout: "/home",
  },

];
export default routes;
