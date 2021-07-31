import React, { Component } from "react";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Image from 'react-bootstrap/Image';
import Carousel from 'react-bootstrap/Carousel'

import 'bootstrap/dist/css/bootstrap.min.css';
import "../css/App.css";


import Footer from '../views/Footer.js';

import headerImage from '../rsrc/imgs/Chad_Banner.png';
import taglineImg from '../rsrc/imgs/letsNotAllBeGrey.png';

import chad from '../rsrc/imgs/Chad.png';
import chad2 from '../rsrc/imgs/Chad_HoolaHoop.png';
import chadBadge from '../rsrc/imgs/ChadBadge_Blue.png';
import pinkSlipImg from '../rsrc/imgs/PinkSlip.png';
import goldStarBadgeImg from '../rsrc/imgs/GoldStarBadge.png';



import footerImage from '../rsrc/imgs/chadbanner_footer.png';
import headBanner from '../rsrc/imgs/chadbanner_l2.png';
import bgImage from '../rsrc/imgs/chad_bg.png';
import bgImage2 from '../rsrc/imgs/chad_bg2.png';

export default function Home(props) {
  return (
    <div className="Home" style={{backgroundImage: `url(${bgImage})`, backgroundAttachment: "fixed",
                                    backgroundSize: "cover", justifyContent: "center", }}>       
    
    <Image className="HeadBanner" style={{zIndex: 1, marginBottom: "10vh", position: "absolute", top: 45, left: 0, maxWidth: "85vw",
                                          maxHeight: "25vh", overflowY: "hidden" }} src={headBanner} />  
      <div style={{paddingTop: "35vh"}}>
        <Image className ="TagLine" style={{zIndex: 1, marginBottom: "10vh", maxWidth: "85vw",
                                          maxHeight: "25vh" }} src={taglineImg} />
      </div>
      <div className="GoldStarsCopy" style={{}}>
     
      <Carousel pause={false}  nextLabel=""  prevLabel=""
        style={{ background: "linear-gradient(0deg, rgba(122,77,22,0) 0%, rgba(195,248,255,1) 14%, rgba(0,0,0,1) 18%, rgba(0,0,0,1) 36%, rgba(47,63,77,1) 57%, rgba(141,149,174,1) 59%, rgba(134,151,210,0.3939776594231442) 72%, rgba(185,185,185,0) 89%)"
      }}
      >
        <Carousel.Item>
        <Container style={{ paddingTop: "10vh",
          }} fluid >
          <Row style={{maxWidth: "90vw", }}>
            <Col >
              <Image className="BadgeImage" style={{ maxWidth: "85vw", overflowY: "hidden" }} src={goldStarBadgeImg} />  
            </Col>
            <Col>
              <span style={{color: "white", textAlign: "left", paddingTop: "22%", paddingBottom: "22%" , fontSize: "150%"}}>
                GoldStars can be issued by anyone to anyone, usually for chad moves, or any type of socially-positive behavior. Each Gold Star includes a tip in !Red.
              </span>
            </Col>
          </Row>
        </Container>

        </Carousel.Item>
        <Carousel.Item>
        <Container style={{paddingTop: "10vh",
                             
                            }} fluid >
          <Row style={{maxWidth: "90vw"}}>
            <Col>
              <span style={{color: "white", textAlign: "left", paddingTop: "22%", paddingBottom: "22%" , fontSize: "150%"}}>
              Pinkslips for dick moves, or breaking community rules.
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
              <span style={{color: "white", textAlign: "left", marginTop: "14vh", fontSize: "150%"}}>
                DAO-Issued
                Chad Badges can only be issued with a community vote, and are generally reserved for exceptional contributions or exceptionally chad moves.
              </span>
            </Col>
          </Row>
          </Container>
        </Carousel.Item>
        </Carousel>
          <Container style={{ paddingTop: "10vh",
          background: "linear-gradient(0deg, rgba(122,77,22,0) 0%, rgba(195,248,255,1) 14%, rgba(0,0,0,1) 18%, rgba(0,0,0,1) 36%, rgba(47,63,77,1) 57%, rgba(141,149,174,1) 59%, rgba(134,151,210,0.3939776594231442) 72%, rgba(185,185,185,0) 89%)"
          }} fluid >
          <Row style={{maxWidth: "90vw", }}>
            <Col >
              <Image className="BadgeImage" style={{ maxWidth: "85vw", overflowY: "hidden" }} src={goldStarBadgeImg} />  
            </Col>
            <Col>
              <span style={{color: "white", textAlign: "left", paddingTop: "22%", paddingBottom: "22%" , fontSize: "150%"}}>
                GoldStars can be issued by anyone to anyone, usually for chad moves, or any type of socially-positive behavior. Each Gold Star includes a tip in !Red.
              </span>
            </Col>
          </Row>
        </Container>
        <Container style={{paddingTop: "10vh",
                            background: "linear-gradient(0deg, rgba(122,77,22,0) 0%, rgba(195,248,255,1) 14%, rgba(0,0,0,1) 18%, rgba(0,0,0,1) 36%, rgba(47,63,77,1) 57%, rgba(141,149,174,1) 59%, rgba(134,151,210,0.3939776594231442) 72%, rgba(185,185,185,0) 89%)"
                             
                            }} fluid >
          <Row style={{maxWidth: "90vw"}}>
            <Col>
              <span style={{color: "white", textAlign: "left", paddingTop: "22%", paddingBottom: "22%" , fontSize: "150%"}}>
              Pinkslips for dick moves, or breaking community rules.
              </span>
            </Col>
            <Col>
              <Image className="BadgeImage" style={{ maxWidth: "85vw", overflowY: "hidden" }} src={pinkSlipImg} />  
            </Col>
          </Row>
        </Container>
        <Container style={{
          background: "linear-gradient(0deg, rgba(122,77,22,0) 0%, rgba(195,248,255,1) 14%, rgba(0,0,0,1) 18%, rgba(0,0,0,1) 36%, rgba(47,63,77,1) 57%, rgba(141,149,174,1) 59%, rgba(134,151,210,0.3939776594231442) 72%, rgba(185,185,185,0) 89%)"
          }} fluid >
          <Row style={{maxWidth: "90vw", }}>
            <Col >
              <Image className="BadgeImage" style={{ maxWidth: "85vw", overflowY: "hidden" }} src={chadBadge} />  
            </Col>
            <Col>
              <span style={{color: "white", textAlign: "left", marginTop: "14vh", fontSize: "150%"}}>
                DAO-Issued
                Chad Badges can only be issued with a community vote, and are generally reserved for exceptional contributions or exceptionally chad moves.
              </span>
            </Col>
          </Row>
          </Container>
          <Container style={{paddingTop: "45vh"}} >
          </Container>
      </div>
    </div>
  )
}
