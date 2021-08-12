import React, { Component } from "react";
import { useState } from "react";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

import BadgeSearch from "../components/Badge_Search";
import MintingAgent from '../components/MintingAgent.js';

import headerImage from '../rsrc/imgs/ColoredBadgesHeader_w_badge_compressed.png';

import 'bootstrap/dist/css/bootstrap.min.css';
import "../css/App.css";

export default function NEW_MintingDesk(props) {


  return (
    <>
    
    <div className="App" style={{ justifyContent: "center"}}>       
        
        {/* <NavigationBar class="white" {...props}/> */}
        {/*<img alt="Header" src={headerImage} />*/}
          <Container xs={6} m={12} className="aboutBadgesContainer" style={{justifyContent: "center", backgroundColor: "transparent"}}>   
            <Row>
              <Col style={{justifyContent: "center"}}>
                <Row>
                  <Image style={{alignContent: "center", padding: 0}} alt="Header" src={headerImage} />
                </Row>
              </Col>
            </Row>
          </Container>
        <br />
        <br />
        <Container style={{alignContent: "center", justifyContent: "center"}}>
          <Row style={{marginTop: "5vh"}}>
            <MintingAgent badge={props._pinkSlips} {...props} />
          </Row>
          {/*
          <Row style={{marginTop: "5vh"}}>
            <MintingAgent badge={props._pinkSlips}  badge={props.pinkSlips} {...props} />
          </Row> 
          <Row style={{marginTop: "5vh"}}>
            <MintingAgent badge={props.goldStars}  {...props} />
          </Row>
          <Row style={{marginTop: "5vh"}}>
            <BadgeSearch {...props} />
          </Row> */}
        </Container>
    </div>
    </>
  )
}
