import React from "react";

import PassportAgent from '../components/PassportAgent.js';

import Row from 'react-bootstrap/Row';

import 'bootstrap/dist/css/bootstrap.min.css';
import "../css/App.css";
import "../css/styles.css";




export default function PassportOffice(props) {

  return (

    <div className="App" style={{color: "white", alignContent: "center", marginTop: "20vh", justifyContent: "center"}}>       
        <h3 style={{marginTop: "-10%"}} > Apply for a ColoredID <br /> (coming soon)</h3>
        <br /><br />
        <Row>
                {/* <PassportAgent badge={props._coloredID} {...props} /> */}
        </Row>
        <br /><br />    
    </div>


  )
}
