import  React from "react";
import { useState } from "react";
import { Backdrop } from '@material-ui/core';

import Button from 'react-bootstrap/Button';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

import chadBadge from '../rsrc/imgs/ChadBadge_Blue.png';
import pinkSlipImg from '../rsrc/imgs/PinkSlip.png';
import goldStarBadgeImg from '../rsrc/imgs/GoldStarBadge.png';
import coloredID from '../rsrc/imgs/ColoredID.png';

import ColoredIDSign from '../rsrc/imgs/ColoredID_large.gif';
import PinkSlipSign from '../rsrc/imgs/PinkSlip.gif';
import GoldStarSign from '../rsrc/imgs/GoldStar.gif';
import ChadBadgeSign from '../rsrc/imgs/ChadBadge.gif';

import headerImage from '../rsrc/imgs/ColoredBadgesHeader_w_badge_compressed.png';

import '../css/styles.css';


export default function AboutBadges(props) {

  const blackish = "rgb(34, 26, 12)";

  const textColor = "aliceblue";// ( props.dark ? blackish : "aliceblue" );
  const bgColor = ( props.dark ? "rgba(87, 87, 87, 0.39)" : "transparent" );
  return (

    <>

    
    <Container className="badgeTypeContainer"
              style={props.noHeader ? null: { minHeight: "97vh", paddingBottom: "30vh"}}
              style={{ color: textColor, justifyContent: "center"}}>
      <Row style={{background: "rgba(240, 248, 255, 0.616)", borderRadius: "5px", color: blackish, fontSize: "22px", textAlign:"left",
                  marginTop: 0, marginBottom: "3vh",  marginRight: "4vw", marginLeft: "4vw", padding: "4vw"}} >
        Colored badged provide a unique and user-friendly way 
        for DAOs and DAO members to mark and query the social-integrity, contribution history, or psuedo-identity of a given wallet address.
        <br /><br />
        Before our composable protocol is ready, we want your help testing out various badge concepts in a global setting.
        <br /><br />
        Depending on the badge, they can be issued based on one's actions, contributions, or pseudo-verified idenity. Most Colored badges can 
        be issued by any user, although some types may have additinoal restrictions - such as being limited to issuance only by community vote.
        Once issued, colored badges require the consent of the issuing party or an overseeing DAO to be transfered or removed.
        <br /><br />
        Take a look below to check out some of our exploratory badge types, and hop on over to the minting desk to give them a try!
      </Row>
    <Row style={{ paddingTop: "4vh", backgroundColor: bgColor}} >
      <Row m={12} l={12}>
        
        <Col m={12} l={6}>
         <Row >  <img src={ColoredIDSign} /> </Row>
          <Row style={{ fontSize: "20px", fontWeight: "600" , paddingLeft: "10vw", paddingRight: "5vw", textAlign: "right" }}>
          {"Colored IDs are issued based on your pseudo-identity, verified with an active social account."
          + " Each badge features a verified NFT avatar, and comes with a welcome distribution of Red Pens"}
          </Row>
        </Col>

        <Col m={12} l={6}>
        <Row style={{marginLeft: "8vw"}} > {"Verified Social Accounts"} <br /> {"& NFT Avatars"} </Row>
        <Row style={{minWidth: "350px", marginLeft: "7vw"}} > <img src={coloredID} /> </Row>
        </Col>
      
      </Row>

      <Row>
        <img src={headerImage} style={{marginTop: "-15vh", marginBottom: "-10vh"}} />
      </Row>

      <Row >
        
        <Col s={12} m={6}>
          <Row style={{marginTop: "2vh", marginBottom: "3vh"}}>
            <img src={PinkSlipSign} />
            <Row style={{ fontSize: "20px", fontWeight: "600" , paddingLeft: "5vw", textAlign: "left" }}>
            {"A fun way to reprimand one for breaking community rules, or just all around being a dick."
            + " PinkSlips can be issued by any user, to any other user, and may only be removed upon a successful dispute application."}
            </Row>
            <img style={{minWidth: "350px"}} src={pinkSlipImg} />
            
          </Row>

          <Row>
            <img src={ChadBadgeSign} />
            <Row style={{ fontSize: "20px", fontWeight: "600" , paddingLeft: "5vw", textAlign: "left" }}>          
            {"ChadBadges are crowd-issued recognition badges, with users pooling community tokens to vote"
            + " for a chad. If a Chad is elected, the voting tokens are split between the Chad and the burn address."}
            </Row>
            <img style={{minWidth: "350px", paddingLeft: "100px"}} src={chadBadge} />
          </Row>
        </Col>


        <Col s={12} m={6} style={{marginTop: "20vh"}}>
          <Row>
            <img src={GoldStarSign} />
            <br />
            <Row style={{ fontSize: "30px" , fontWeight: "600" , color: "lime", paddingLeft: "5vw", textAlign: "right"}}>
              {"Send pens to your friends!"}
            </Row>
            <Row style={{ fontSize: "20px", fontWeight: "600" , paddingLeft: "5vw", textAlign: "right" }}>
              {"GoldStars can be issued (with a tip!) for any socially-beneficial behavior, or even just for fun."}
            </Row>
            <img style={{minWidth: "350px"}} src={goldStarBadgeImg} />
            <br />
            
          </Row>
        </Col>
      
      </Row>
      </Row>  

      
    </Container>

    
    </>

  )
}