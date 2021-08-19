import React from 'react';

import Home from './pages/Home.js';
import MintingDesk from './pages/MintingDesk.js';
import PassportOffice from './pages/PassportOffice.js';
import ElectAChad from './pages/ElectAChad.js';
import AboutBadges from './pages/AboutBadges.js';
import WalletSearch from './pages/Wallet_Search.js';
import Disputes from './pages/Disputes.js';
import Faucet from './pages/Faucet.js';


// import all the icons
import FaceIcon from '@material-ui/icons/Face'; // alt home icon
import DesktopMacIcon from '@material-ui/icons/DesktopMac';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import HowToVoteIcon from '@material-ui/icons/HowToVote';
import RedeemIcon from '@material-ui/icons/Redeem';
import LooksIcon from '@material-ui/icons/Looks';
import GavelIcon from '@material-ui/icons/Gavel';
import PageviewIcon from '@material-ui/icons/Pageview';
import LocalDrinkIcon from '@material-ui/icons/LocalDrink';



var routes = [
 
  {
    path: "Home",
    name: "Home",
    component: Home,
    layout: "/",
    icon: FaceIcon,
  },
  {
    path: "AboutBadges",
    name: "About Badges",
    component: AboutBadges,
    layout: "/",
    icon: LooksIcon,
  },
  {
    path: "MintingDesk",
    name: "Minting Desk",
    component: MintingDesk,
    layout: "/",
    icon: CreateOutlinedIcon,
  },
 
  {
    path: "Disputes",
    name: "Disputes",
    component: Disputes,
    layout: "/",
    icon: GavelIcon,
  },
  {
    path: "Search",
    name: "Badge Search",
    component: WalletSearch,
    layout: "/",
    icon: PageviewIcon,
  },
  {
    path: "Passport",
    name: "Passport Office",
    component: PassportOffice,
    layout: "/",
    icon: FingerprintIcon,
  },
  {
    path: "Elections",
    name: "Elections",
    component: ElectAChad,
    layout: "/",
    icon: HowToVoteIcon,
  },
  {
    path: "InkFaucet",
    name: "Faucet",
    component: Faucet,
    layout: "/",
    icon: LocalDrinkIcon,
  },

];
export default routes;
