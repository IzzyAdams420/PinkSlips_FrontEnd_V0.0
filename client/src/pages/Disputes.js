import React from "react";

import DisputeForm from '../components/DisputeForm.js';
import MintingAgent from '../components/MintingAgent.js';

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
      <Row style={{marginTop: "5vh"}}>
        <MintingAgent {...props} />
      </Row> 
      <br /><br />    
    </div>
  )
}
