import React from 'react';
import MintingDesk from './pages/MintingDesk.js';
import AboutBadges from './pages/AboutBadges.js';
import BadgeSearch from './pages/Badge_Search.js';
import SamplePage from "./pages/samplepage.js";

var routes = [
 
  {
    path: "Home",
    name: "Home",
    component: MintingDesk,
    layout: "/",
  },
  {
    path: "MintingDesk",
    name: "Minting Desk",
    component: MintingDesk,
    layout: "/",
  },
  {
    path: "AboutBadges",
    name: "About Badges",
    component: AboutBadges,
    layout: "/",
  },
  {
    path: "Disputes",
    name: "Disputes",
    component: BadgeSearch,
    layout: "",
  },
  {
    path: "Search",
    name: "Badge Search",
    component: BadgeSearch,
    layout: "/",
  },
  {
    path: "InkFaucet",
    name: "Faucet",
    component: BadgeSearch,
    layout: "/",
  },

];
export default routes;
