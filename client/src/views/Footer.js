import React, { Component } from "react";
import { useState } from "react";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';


import 'bootstrap/dist/css/bootstrap.min.css';
import "../css/App.css";



import chad from '../rsrc/imgs/Chad.png';
import chad2 from '../rsrc/imgs/Chad_HoolaHoop.png';
import footerImage from '../rsrc/imgs/chadbanner_footer.png';

export default function Footer(props) {
  const [chadOff, setChadOff] = useState(false);

  const turnChadOff = () => {
    setChadOff(true);
  }

  return (
    <div className="Footer" style={{position: "-webkit-sticky",  position: "sticky", bottom: 0, overflow: "hidden"}}>            
      { chadOff ? null : 
        <Image className="Chad" onClick={turnChadOff} style={{zIndex: 2,  position: "fixed", bottom: 0,
            right: 0, maxWidth: "40vw", maxHeight: "44vh" }} src={chad2} />  
      }
      <Row style={{zIndex: 2, position: "absolute", bottom: "25%", left: "5%", width: "100%", fontSize: "98%"}} >
      coloredbadges.fun
      </Row>
        <Image className="ChadFloor" style={{zIndex: 0, minHeight: 85, maxHeight: 100, bottom: 0, left: 0, width: "100%" }} src={footerImage} />
    </div>
  )
}
