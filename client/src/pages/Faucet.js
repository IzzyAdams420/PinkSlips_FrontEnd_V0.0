import React, { Component, useState, useEffect } from "react";
import Web3 from "web3";

import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

//import Button from 'react-bootstrap/Button';

import RedPens from "../contracts/RedPens.json";
import VendingMachine from "../contracts/VendingMachine.json";

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import 'bootstrap/dist/css/bootstrap.min.css';
import "../css/App.css";
import "../css/styles.css";

import redPenIcons from '../icons/redPenIcon.png';
import headerImage from '../rsrc/imgs/Chad_Banner.png';

export default function Faucet (props) {

  const web3 = props.web3;
  const accounts = props.accounts;
  const vendingAddress = props.vendingMachineAddress;


  const claimPens = (spendAmount) => {
    web3.eth.sendTransaction({
      from: accounts[0],
      to: vendingAddress.toString(),
      value: web3.utils.toWei(spendAmount.toString(), 'ether').toString()
   })
  }

  return (
    <div className="App" style={{color: "white", alignContent: "center", marginTop: "20vh", justifyContent: "center"}}>       
      <h1>Faucet</h1>
      <Container>
        <Row>
          <Col xs={0} lg={3}>
          </Col>

          <Col xs={12} lg={6}>
            <Card className="FaucetInterface" style={{}}>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  {"xDai -> !Red"}
                </Typography>
                <Typography variant="h5" component="h2">
                Claim your Red Pens
                </Typography>
                <Typography color="textSecondary">
                {"2133 of 10,000 !Red remaining"}
                </Typography>
                
                <Container>
                    <Row>
                      <Col xs={1} md={3}>
                      </Col>

                      <Col xs={10} md={6}>
                        <Card className="FaucetIcon" style={{backgroundColor: "pink" }}
                            onClick={()=>{claimPens(1)}} >
                          <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                              {"xDai -> !Red"}
                            </Typography>
                            <div className='tokenMeter'>
                              <img className='tokenIcon' id='redPenIcon' src={redPenIcons} />
                              <img className='tokenIcon' id='redPenIcon' src={redPenIcons} />
                              <img className='tokenIcon' id='redPenIcon' src={redPenIcons} />
                            </div>
                            <Typography variant="h5" component="h2">
                            1 xDAI / 10 !Red
                            </Typography>
                          
                          </CardContent>
                        </Card>
                      </Col>

                      <Col xs={1} md={3}>
                      </Col>
                    </Row>
                  </Container>
                <br />
                
              </CardContent>
              <CardActions style={{justifyContent: "center"}}>
                <Button color="secondary" size="small" onClick={()=>{claimPens(1)}} ><strong>Get !Red</strong></Button>
              </CardActions>
            </Card>
          </Col>

          <Col xs={0} lg={3}>
          </Col>
        </Row>
      </Container>
      <h3 style={{paddingTop: 8}} >(Coming Soon)</h3>
      



    </div>
  )
}
