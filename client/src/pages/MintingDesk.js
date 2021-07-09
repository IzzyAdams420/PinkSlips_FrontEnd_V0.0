import React, { Component } from "react";
import { useState } from "react";

import getWeb3 from "../components/getWeb3";
import GoldStarsInterface from "./GoldStars_Interface";
import PinkSlipsInterface from "./PinkSlips_Interface";
import BadgeSearch from "./Badge_Search";
import NavigationBar from "./Navigation";
// import JuryPoolInterface from "./JuryPoolInterface";


import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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

export default function MintingDesk(props) {


  return (
    <div className="App" style={{justifyContent: "center"}}>       
        
        
        {/*<img alt="Header" src={headerImage} />*/}
        <AboutBadges style={{marginTop: "50px"}}/>
        <br />
        <br />
        <br />
        <Container fluid style={{alignContent: "center", minWidth:"380px", maxWidth:"1100px", justifyContent: 'center', margin: "0 auto"}} >
          <Row>
            <Col>
              {/* <JuryPoolInterface {...this.state} />
              <br /> */}
              <BadgeSearch {...props} />
              <br / >
              <PinkSlipsInterface {...props} />
              <br />
              <GoldStarsInterface {...props} />

              <br />
              <BadgeSearch {...props} />
              <br /><br />
            </Col>
          </Row>
        </Container>
      </div>

  )
}
