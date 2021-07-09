import React from 'react';
import MintingDesk from './pages/MintingDesk.js';
import AboutBadges from './pages/AboutBadges.js';
import BadgeSearch from './pages/Badge_Search.js';

// import all the icons
import FaceIcon from '@material-ui/icons/Face'; // alt home icon
import DesktopMacIcon from '@material-ui/icons/DesktopMac';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import RedeemIcon from '@material-ui/icons/Redeem';
import LooksIcon from '@material-ui/icons/Looks';
import GavelIcon from '@material-ui/icons/Gavel';
import PageviewIcon from '@material-ui/icons/Pageview';
import LocalDrinkIcon from '@material-ui/icons/LocalDrink';

var routes = [
 
  {
    path: "Home",
    name: "Home",
    component: MintingDesk,
    layout: "/",
    icon: FaceIcon,
  },
  {
    path: "MintingDesk",
    name: "Minting Desk",
    component: MintingDesk,
    layout: "/",
    icon: CreateOutlinedIcon,
  },
  {
    path: "AboutBadges",
    name: "About Badges",
    component: AboutBadges,
    layout: "/",
    icon: LooksIcon,
  },
  {
    path: "Disputes",
    name: "Disputes",
    component: BadgeSearch,
    layout: "/",
    icon: GavelIcon,
  },
  {
    path: "Search",
    name: "Badge Search",
    component: BadgeSearch,
    layout: "/",
    icon: PageviewIcon,
  },
  {
    path: "InkFaucet",
    name: "Faucet",
    component: BadgeSearch,
    layout: "/",
    icon: LocalDrinkIcon,
  },

];
export default routes;
