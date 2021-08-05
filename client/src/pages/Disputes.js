import React, { Component, useState } from "react";
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

//import Button from 'react-bootstrap/Button';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import DisputeForm from '../components/DisputeForm.js';

import 'bootstrap/dist/css/bootstrap.min.css';
import "../css/App.css";
import "../css/styles.css";

import redPenIcons from '../icons/redPenIcon.png';
import headerImage from '../rsrc/imgs/Chad_Banner.png';



export default function Disputes(props) {

  const juryBailiffAddress = props.juryBailiffAddress;
  const juryBailiff = props.juryBailiff;
  const pinkSlips = props.pinkSlips;

  const addressManager = props.addressManager;

  const [badgeId, setBadgeId] = useState(0);
  const [defense, setDefense] = useState("No Excuse");

  const submitDispute = async (badgeType, tokenId, defense) => {

  
    const _txData = props.web3.eth.abi.encodeFunctionCall(
                                  {
                                    "inputs": [
                                      {
                                        "internalType": "uint256",
                                        "name": "tokenId",
                                        "type": "uint256"
                                      }
                                    ],
                                    "name": "revokeBadge",
                                    "outputs": [],
                                    "stateMutability": "nonpayable",
                                    "type": "function"
                                  },
                                  [tokenId]);

    const disputeId = await juryBailiff.methods.proposeAction( juryBailiffAddress, 0, txData, defense).send({from: props.accounts[0]});
  }

  const txData = props.web3.eth.abi.encodeFunctionCall(
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "revokeBadge",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    ["1"]);

  const testDispute = async () => { submitDispute(pinkSlips, "1", "No Defense")};

  return (
    <div className="App" style={{color: "white", alignContent: "center", marginTop: "20vh", justifyContent: "center"}}>       
      <h3 style={{marginTop: "-10%"}} >Community Managed Disputes <br /> (coming soon)</h3>
      <br /><br />
        <DisputeForm {...props} />
      <br /><br />    
    </div>
  )
}
