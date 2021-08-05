import React, { Component } from "react";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Carousel from 'react-bootstrap/Carousel'

import 'bootstrap/dist/css/bootstrap.min.css';
import "../css/App.css";

import chadBadge from '../rsrc/imgs/ChadBadge_Blue.png';
import pinkSlipImg from '../rsrc/imgs/PinkSlip.png';
import goldStarBadgeImg from '../rsrc/imgs/GoldStarBadge.png';
import coloredID from '../rsrc/imgs/ColoredID.png';

const bgGradient = "linear-gradient(0deg, rgba(122,77,22,0) 0%, rgba(195,248,255,1) 14%, rgba(0,0,0,1) 18%, rgba(0,0,0,1) 36%, rgba(47,63,77,1) 57%, rgba(141,149,174,1) 59%, rgba(134,151,210,0.3939776594231442) 72%, rgba(185,185,185,0) 89%)"

export default function BadgeCarousel(props) {
 const textColor =  props.light ? "black" : "white";
 
 return (
    <div className="BadgeCarousel">       
     <Carousel pause={false}  nextLabel=""  prevLabel=""
        style={props.light ? (null) : { background: bgGradient}} >
        <Carousel.Item>
        <Container style={{ 
          }} fluid >
          <Row style={{maxWidth: "90vw", }}>
            <Col >
              <Image className="BadgeImage" style={{ maxWidth: "85vw", overflowY: "hidden" }} src={goldStarBadgeImg} />  
            </Col>
            <Col>
              <span style={{ color: textColor, textAlign: "left", paddingTop: "22%", paddingBottom: "22%" , fontSize: "150%"}}
                 >
                GoldStars can be issued by anyone to anyone, usually for chad moves, or any type of socially-positive behavior. Each Gold Star includes a tip in !Red.
              </span>
            </Col>
          </Row>
        </Container>

        </Carousel.Item>
        <Carousel.Item>
        <Container style={{
                             
                            }} fluid >
          <Row style={{maxWidth: "90vw"}}>
            <Col>
              <span style={{color: textColor, textAlign: "left", paddingTop: "22%", paddingBottom: "22%" , fontSize: "150%"}}>
              Pinkslips are for dick moves, or breaking community rules. For certain communities, these may serve as disqualifiers for membership.
              </span>
            </Col>
            <Col>
              <Image className="BadgeImage" style={{ maxWidth: "85vw", overflowY: "hidden" }} src={pinkSlipImg} />  
            </Col>
          </Row>
        </Container>
        </Carousel.Item>
        <Carousel.Item>
        <Container style={{
          }} fluid >
          <Row style={{maxWidth: "90vw", }}>
            <Col >
              <Image className="BadgeImage" style={{ maxWidth: "85vw", overflowY: "hidden" }} src={chadBadge} />  
            </Col>
            <Col>
              <span style={{color: textColor, textAlign: "left", marginTop: "14vh", fontSize: "150%"}}>
                DAO-Issued
                Chad Badges can only be issued with a community vote, and are generally reserved for exceptional contributions or exceptionally chad moves.
              </span>
            </Col>
          </Row>
          </Container>
        </Carousel.Item>
        <Carousel.Item>
        <Container style={{
                             
                            }} fluid >
          <Row style={{maxWidth: "90vw"}}>
            <Col>
              <span style={{textColor, textAlign: "left", paddingTop: "22%", paddingBottom: "22%" , fontSize: "150%"}}>
              Colored IDs can be issued by a governing DAO, based on a users social-verified psuedonym. IDs may be transfered to new wallets by the issuing DAO, upon petition by the ID holder.
              </span>
            </Col>
            <Col>
              <Image className="BadgeImage" style={{ maxWidth: "85vw", overflowY: "hidden" }} src={coloredID} />  
            </Col>
          </Row>
        </Container>
        </Carousel.Item>
        </Carousel>
    </div>
  )
}
