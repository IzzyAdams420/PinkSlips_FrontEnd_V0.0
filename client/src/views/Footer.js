import React, { Component } from "react";
import { useState } from "react";

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

        <Image className="ChadFloor" style={{zIndex: 0, bottom: 0, left: 0, width: "100%" }} src={footerImage} />
    </div>
  )
}
