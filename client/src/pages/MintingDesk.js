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
import Jumbotron from 'react-bootstrap/Jumbotron';
import Image from 'react-bootstrap/Image';



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
    <>
    
    <div className="App" style={{ justifyContent: "center"}}>       
        
        {/* <NavigationBar class="white" {...props}/> */}
        {/*<img alt="Header" src={headerImage} />*/}
        <Jumbotron xs={6} m={12} style={{justifyContent: "center"}}>
          <Container className="aboutBadgesContainer" style={{backgroundColor: "transparent"}}>   
            <Row>
              <Col style={{justifyContent: "center"}}>
                <Row>
                  <Image style={{alignContent: "center", padding: 0}} alt="Header" src={headerImage} />
                </Row>
              </Col>
            </Row>
          </Container>
        </Jumbotron>
        <br />
        <br />
        <Container fluid style={{alignContent: "center", minWidth:"380px", maxWidth:"1100px", justifyContent: 'center', margin: "0 auto"}} >
          <Row>
            <Col>
              {/* <JuryPoolInterface {...this.state} />
              <br /> */}
              {/* <BadgeSearch toggleDrawer={props.toggleDrawer} {...props} />
              <br / > */}
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
    </>
  )
}
