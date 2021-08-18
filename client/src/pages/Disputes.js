import React from "react";

import DisputeForm from '../components/DisputeForm.js';
import BadgeImageGenerator from '../components/BadgeImageGenerator.js';

import Row from 'react-bootstrap/Row';

import 'bootstrap/dist/css/bootstrap.min.css';
import "../css/App.css";
import "../css/styles.css";




export default function Disputes(props) {

  return (
    <div className="App" style={{color: "white", alignContent: "center", marginTop: "20vh", justifyContent: "center"}}>       
      <h3 style={{marginTop: "-10%"}} >Community Managed Disputes <br /> (coming soon)</h3>
      <br /><br />
      <Row>
        <DisputeForm {...props} /> 
      </Row>
      <br /><br />
{/*      <Row>
        <BadgeImageGenerator badge={props.goldStars}
          badgeTokenId={42069}
          badgeReason={"OMG! Sam cuts the best fucking watermelon!"}
          badgeSender={"0xFc961Da137b43B7F0Bf612079FC2f91d9216DdF2"}
          badgeTip={"420"} /> 
      </Row>
      <Row>
        <BadgeImageGenerator badge={props.pinkSlips}
          badgeTypeId={1}
          badgeTokenId={42069}
          badgeReason={"OMG! Sam cuts the best fucking watermelon!"}
          badgeSender={"0xFc961Da137b43B7F0Bf612079FC2f91d9216DdF2"}
          /> 
      </Row> */}
      <Row style={{zIndex: 2, position: "fixed", bottom: "5vh"}}>
        <BadgeImageGenerator badge={props.coloredID}
          badgeTokenId={42069}
          web3={props.web3} /> 
        
      </Row>
      <br /><br />    
    </div>
  )
}
