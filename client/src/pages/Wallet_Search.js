import React, { Component } from "react";
import { useState } from "react";


import getWeb3 from "../components/getWeb3";
import GoldStarsInterface from "./GoldStars_Interface";
import PinkSlipsInterface from "./PinkSlips_Interface";
import BadgeSearch from "../components/Badge_Search";
import NavigationBar from "./Navigation";
// import JuryPoolInterface from "./JuryPoolInterface";


import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';

import Web3Prompt from "../components/Web3Prompt";

import AboutBadges from "./AboutBadges";


import GoldStars from "../contracts/GoldStars.json";
import PinkSlips from "../contracts/PinkSlips.json";
import RedPens from "../contracts/RedPens.json";
import JuryPool from "../contracts/JuryPool.json";



import 'bootstrap/dist/css/bootstrap.min.css';


import "../css/App.css";

import headerImage from '../rsrc/imgs/ColoredBadgesHeader_w_badge_compressed.png';

export default function MintingDesk(props) {


  return (
    <div className="App" style={{minHeight: "130vh", justifyContent: "center"}}>       
          <Container xs={6} m={12} className="aboutBadgesContainer" style={{justifyContent: "center", backgroundColor: "transparent"}}>   
            <Row>
              <Col style={{justifyContent: "center"}}>
                <Row>
                  <Image style={{marginBottom: "-20px", alignContent: "center", padding: 0, marginRight: "-5", marginLeft: "-5"}} alt="Header" src={headerImage} />
                  <BadgeSearch toggleDrawer={props.toggleDrawer} {...props} style={{marginTop: "0px !important"}}/>
                </Row>
                <Row style={{paddingTop: "45vh"}}>
                </Row>
                
              </Col>
            </Row>
          </Container>
    </div>

  )
}
