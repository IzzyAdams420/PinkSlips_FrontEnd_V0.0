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

import BadgeCarousel from "../components/BadgeCarousel";

import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';

import MarkdownPreview from "@uiw/react-markdown-preview";

import headerImage from '../rsrc/imgs/ColoredBadgesHeader_w_badge_compressed.png';
import badgeBanner from '../rsrc/imgs/ColoredBadgeArray.png';

import ColoredPaper from '../components/ColoredPaper.js';
import '../css/styles.css';

const aboutColoredBadgesPreview = ``;

const aboutColoredBadgesFull = ``;



export default function AboutBadges(props) {

  const [isExpanded, setIsExpanded] = useState(true);
  const blackish = "rgb(34, 26, 12)";
  
  const toggleAboutLength = () => { 

    
    setIsExpanded(!isExpanded);
    
  }

  const divider = (bottomMargin, color) => {
    return <> <Row style={{padding: 2, marginTop: "2vh", marginBottom: bottomMargin + "vh",
                            backgroundColor: color}} >
    </Row> </>
  }

  return (

    <>

    
    <Container xs={6} m={12} className="aboutBadgesContainer" style={props.noHeader ? null: {minHeight: "97vh", paddingBottom: "30vh"}} style={{ backgroundColor: "aliceblue", justifyContent: "center"}}>   
        
      <Row>
        {
          props.noHeader
          ?
          (null)
          :
          ( <>
            <Col style={{justifyContent: "center"}}>        
                <Image style={{alignContent: "center", padding: 0, marginRight: "-5", marginLeft: "-5"}} alt="Header" src={headerImage} fluid />
                <ColoredPaper />
            </Col>
          </>)
        }
      </Row>
      {
          props.noHeader
          ?
          divider(2, "transparent")
          :
          divider(2, blackish)
      }
      {
          props.noCarousel
          ?
          (/*
          <Row style={{justifyContent: "center", marginLeft: "-10%"}}>
            <Col style={{minWidth: "250px", }}>
            <Image className="BadgeImage" style={{padding: "3%", minWidth: "420px", maxWidth: "25vw", overflowY: "hidden" }} src={goldStarBadgeImg} />
            </Col>
            <Col style={{minWidth: "250px", textAlign: "right"}}>
            <Image className="BadgeImage" style={{ padding: "3%", minWidth: "420px", maxWidth: "25vw", overflowY: "hidden" }} src={pinkSlipImg} />
            </Col>
            <Col style={{paddingTop: "3vh", minWidth: "250px", textAlign: "left"}}>
            <Image className="BadgeImage" style={{padding: "3%", minWidth: "420px", maxWidth: "25vw", overflowY: "hidden" }} src={chadBadge} />
            </Col>
            <Col style={{minWidth: "250px", textAlign: "right"}}>
            <Image className="BadgeImage" style={{ padding: "3%", minWidth: "420px", maxWidth: "25vw", overflowY: "hidden" }} src={coloredID} />
            </Col>
          </Row>
          */
          <Row  >
            <Col>
            <Image style={{ marginLeft: "50%", transform: "translateX(-50%)", alignItems: "center", alignSelf: "center", width: "85vw", justifyContent: "center"}} src={badgeBanner} />
            </Col>
          </Row>
          
          )
          :
          (<>
          <BadgeCarousel light={true} />
            <br /></>)
      }
      
      
      {divider(3, "gold")}
      <Row>
        <Col style={{textAlign:"left"}}>
        Colored badged are meant to provide a unique and user-friendly way 
        for DAOs and DAO members to mark and query the social-integrity, contribution history, or psuedo-identity of a given wallet address.
        <br /><br />
        Depending on the badge, they are typically issued based on one's actions, contributions, or pseudo-verified idenity.  Most Colored badges can 
        be issued by any user, although some types may be restricted to issuance only by community vote. Once issued, colored badges require the 
        consent of the issuing party or overseeing DAO to be transfered or revoked.
        </Col>
      </Row>
      
      { props.noCarousel
        ?
        (null)
        :
        (<>
        {divider(4, "gold")}
        <Row>
        <Col style={{minWidth: "250px", }}>
        GoldStars can be issued by anyone to anyone, usually for chad moves, or any type of socially-positive behavior.
        Each Gold Star includes a tip in !Red. <br />
        <Image className="BadgeImage" style={{padding: "3%", minWidth: "220px", maxWidth: "25vw", overflowY: "hidden" }} src={goldStarBadgeImg} />
        {divider(2, "pink")}
        </Col>
        <Col style={{minWidth: "250px", textAlign: "right"}}>
        Pinkslips are for dick moves, or breaking community rules. For certain communities, these may serve as disqualifiers for membership.
        {divider(2, "pink")}
        <Image className="BadgeImage" style={{ padding: "3%", minWidth: "220px", maxWidth: "25vw", overflowY: "hidden" }} src={pinkSlipImg} />
        </Col>
        <Col style={{paddingTop: "3vh", minWidth: "250px", textAlign: "left"}}>
        {window.innerWidth <= 979 ? divider(2, "pink") : (null)}
        DAO-Issued
        Chad Badges can only be issued with a community vote, and are generally reserved for exceptional contributions 
        or exceptionally chad moves.
        <Image className="BadgeImage" style={{padding: "3%", minWidth: "220px", maxWidth: "25vw", overflowY: "hidden" }} src={chadBadge} />
        {divider(2, "pink")}
        </Col>
        <Col style={{minWidth: "250px", textAlign: "right"}}>
        Colored IDs can be issued by a governing DAO, based on a users social-verified psuedonym. IDs may be transfered to new wallets by the issuing DAO, upon petition by the ID holder.
        {divider(2, "pink")}
        <Image className="BadgeImage" style={{ padding: "3%", minWidth: "220px", maxWidth: "25vw", overflowY: "hidden" }} src={coloredID} />
        </Col>
        </Row>
        </>)
      }


      {divider(4, "gold")}
      
    </Container>

    
    </>

  )
}