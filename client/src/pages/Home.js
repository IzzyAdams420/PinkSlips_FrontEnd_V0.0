import React, { Component } from "react";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Image from 'react-bootstrap/Image';
import Carousel from 'react-bootstrap/Carousel'

import 'bootstrap/dist/css/bootstrap.min.css';
import "../css/App.css";

import ColoredPaper from '../components/ColoredPaper.js';
import AboutBadges from './AboutBadges.js';
import blackish  from './AboutBadges.js';
import divider from './AboutBadges.js';
import Footer from '../views/Footer.js';

import headerImage from '../rsrc/imgs/Chad_Banner.png';
import taglineImg from '../rsrc/imgs/letsNotAllBeGrey.png';

import chad from '../rsrc/imgs/Chad.png';
import chad2 from '../rsrc/imgs/Chad_HoolaHoop.png';

import BadgeCarousel from "../components/BadgeCarousel";


import roadmap from '../rsrc/imgs/Roadmap.png';
import footerImage from '../rsrc/imgs/chadbanner_footer.png';
import headBanner from '../rsrc/imgs/chadbanner_l2.png';
import bgImage from '../rsrc/imgs/chad_bg.png';
import bgImage2 from '../rsrc/imgs/chad_bg2.png';

export default function Home(props) {
  return (
    <div className="Home" style={{backgroundImage: `url(${bgImage})`, backgroundAttachment: "fixed",
                                    backgroundSize: "cover", justifyContent: "center", }}>       
    
    <Image className="HeadBanner" style={{zIndex: 1, marginBottom: "7vh", position: "absolute", top: 45, left: 0, maxWidth: "85vw",
                                          maxHeight: "25vh", overflowY: "hidden" }} src={headBanner} />  
      <div style={{paddingTop: "35vh",  marginBottom: "10vh",}}>
        <Image className ="TagLine" style={{zIndex: 1, maxWidth: "85vw",
                                          maxHeight: "25vh" }} src={taglineImg} />
                                 
      </div>
      
      <div className="GoldStarsCopy" style={{}}>
     
      {/* <BadgeCarousel spread={true} /> */}

      <AboutBadges noHeader={true} noCarousel={true} dark={true} />
      <ColoredPaper noHeader={true}/>         
    
      <Image style={{borderStyle: "solid", borderColor: "white", borderWidth: 2,marginTop: "3vh", borderRadius: "10px", maxWidth: "95vw"}}src={roadmap} />

      <Container style={{paddingTop: "45vh"}} >
      </Container>
      </div>
    </div>
  )
}
