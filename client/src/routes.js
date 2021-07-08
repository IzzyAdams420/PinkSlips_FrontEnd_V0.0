import React from 'react';
import MintingDesk from './pages/MintingDesk.js';
import SamplePage from "./pages/samplepage.js";

var routes = [
  {
    path: "/samplePage",
    name: "Sample Page",
    component: SamplePage,
    layout: "/home",
  },
  {
    path: "/MintingDesk",
    name: "Minting Desk",
    component: MintingDesk,
    layout: "/home",
  },
];
export default routes;
