import React, { Component, useState } from "react";
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import 'bootstrap/dist/css/bootstrap.min.css';
import "../css/App.css";
import "../css/styles.css";

import redPenIcons from '../icons/redPenIcon.png';
import headerImage from '../rsrc/imgs/Chad_Banner.png';
import { pink } from "@material-ui/core/colors";



export default function DisputeForm(props) {

    const networkId = props.networkId;
    const juryDAOAddress = "0x333edad0fa6822c3faf4819b2d887570fdbc29bf"; //props.juryDAOAddress;
    const juryBailiffAddress = props.juryBailiffAddress;
    const juryBailiff = props.juryBailiff;
  
    const pinkSlips = props.pinkSlips;
    const goldStars = props.goldStars;

    const courtClerk = props.courtClerk;
    const CourtClerkAddress = 0x8afa9422Cb3AB730105066416F495b70e841b2c8;
  
    const addressManager = props.addressManager;
  
    const [badgeType, setBadgeType] = useState("");
    const [badgeAddress, setBadgeAddress] = useState(null);
    const [badgeId, setBadgeId] = useState(0);
    const [defense, setDefense] = useState("I'm not a cat...");

    const [txData, setTxData] = useState(null);
    
    const handleBadgeChange = (event) => {
      setBadgeType(event.target.value);
      setBadgeAddress(props.[event.target.value + "Address"]);
    };
  
    const handleIdChange = (event) => {
    
        if( Number.isInteger(parseInt(event.target.value))) {
            setBadgeId(parseInt(event.target.value));
        } else if (event.target.value == "") {
            setBadgeId(null);
        } else {
            alert("Badge Id MUST be a number");
        }
        
    };
  
    const handleDefenseChange = (event) => {
      setDefense(event.target.value);
    };

    const formIsValid = () => {
        if( Number.isInteger(parseInt(badgeId))
            && parseInt(badgeId) > 0 
            && badgeAddress != null )
        {
            return true;
        } else {
            return false;
        }
    };
  
    const submitDispute = async () => {

    const badge = props[badgeType];
    const defendant = await parseInt(badge.methods.getBadgeSender(badgeId)).toString();
    const description = "Case #" + badgeId.toString() + " " + " -" + " "+ " \"" + defense + "\"" + " (" + badgeType.toString() + ")";
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
                                  [badgeId]);
                                  
    const tempAddressForTest = '0xb0Bf10CC89a663Dd8834387a18b46f764660Aeb4';

    const _txDataForTest = props.web3.eth.abi.encodeFunctionCall(
                                    {
                                      "inputs": [],
                                      "name": "test",
                                      "outputs": [],
                                      "stateMutability": "nonpayable",
                                      "type": "function"
                                    },
                                    []);



    const _txData2 = props.web3.eth.abi.encodeFunctionCall(
                                    {
                                      "constant": false,
                                      "inputs": [
                                        {
                                          "internalType": "address",
                                          "name": "_actionTo",
                                          "type": "address"
                                        },
                                        {
                                          "internalType": "uint256",
                                          "name": "_actionValue",
                                          "type": "uint256"
                                        },
                                        {
                                          "internalType": "bytes",
                                          "name": "_actionData",
                                          "type": "bytes"
                                        },
                                        {
                                          "internalType": "string",
                                          "name": "_description",
                                          "type": "string"
                                        }
                                      ],
                                      "name": "proposeAction",
                                      "outputs": [
                                        {
                                          "internalType": "uint256",
                                          "name": "",
                                          "type": "uint256"
                                        }
                                      ],
                                      "payable": false,
                                      "stateMutability": "nonpayable",
                                      "type": "function"
                                    },
                                      [badgeAddress, 0, _txData, description]);

    const txRaw = {
        from: props.accounts[0],
        to: badgeAddress,
        data: _txData
    }

  
    //await juryBailiff.methods.proposeAction( tempAddressForTest, 0, _txDataForTest, description).send({from: props.accounts[0]});
    //const disputeId = '1';
    //const disputeId = await juryBailiff.methods.proposeAction( badgeAddress, 0, txData, description).send({from: props.accounts[0]});
    const disputeId = await courtClerk.methods.submitDispute( badgeId, badgeAddress, _txData2).send({from: props.accounts[0]});
    //const disputeId = await props.web3.eth.sendTransaction(txRaw); //badge.methods.revokeBadge(badgeId).send({from: props.accounts[0]});
    setTxData(_txData.toString());
}



  return (
    <div className="DisputeForm" style={{color: "black", alignContent: "left", justifyContent: "center"}}>
        <Container>
            <Row>

                <Col xs={0} md={2}>
                </Col>
                
                <Col xs={12} md={8}>
                    <Card className="FaucetInterface" style={{backgroundColor: "pink" }}
                            onClick={ formIsValid() ? submitDispute : (null) }>
                        <CardContent>
                        <Typography variant="h4" component="h2">
                                Summon the Jury
                        </Typography>
                        <Typography color="textSecondary">
                                {"Submit a dispute below"}
                        </Typography>

                        </CardContent>

                        
                        <Typography variant="h5" component="h2">                
                            <span style={{ textAlign: "center", position: "relative", top: "25px", right: "20%", fontSize: "820%"}}> {"👩‍⚖️"} </span>
                        </Typography>
                    </Card>
                </Col>
                <Col xs={0} md={2}>
                </Col>
            </Row>      
        </Container>

        <br />

        <Container>
            <Row>

                <Col xs={0} md={2}>
                </Col>
                
                <Col xs={12} md={8}>
                    <Card className="FaucetInterface" style={{}}>
                        <CardContent>

                            <Typography variant="h5" component="h2">
                                Appeal Your Badge { txData ? txData : null }
                            </Typography>

                            <Typography color="textSecondary">
                                {"0 of 0 appeals granted"}
                            </Typography>

                            <br />
                            <Container fluid>
                                <Row style={{alignContent: "right", justifyContent: "right" }}>
                                    <Col xs={0} lg={7} >
                                    </Col>
                                    
                                    <Col xs={12} lg={5} >
                                        <TextField id="badge-token-id-input" label="Badge ID" value={badgeId}
                                            onChange={handleIdChange} />
                                    </Col>
                                </Row>
                                <Row>
                                    <FormControl className="DisputeForm_A">
                                        <InputLabel id="select-badge-type">Badge Type</InputLabel>
                                            <Select
                                            labelId="demo-simple-select-helper-label"
                                            id="demo-simple-select-helper-label"
                                            value={badgeType}
                                            onChange={handleBadgeChange}
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                <MenuItem value={"pinkSlips"}>PinkSlip</MenuItem>
                                                <MenuItem value={"goldStars"}>GoldStar</MenuItem>
                                            </Select>
                                    </FormControl>                                                                                            
                                </Row>

                                <Row>
                                    <TextField
                                    id="reason-for-appeal"
                                    label="Reason for appeal:"
                                    helperText="(Be concise, you can provide more information later in your case thread).)"
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="filled"
                                    value={defense}
                                    onChange={handleDefenseChange}
                                    />
                                </Row>
                                
                            </Container>
                        </CardContent>

                        <CardActions style={{justifyContent: "center"}}>
                            <Button onClick={submitDispute} color="secondary" size="small" ><strong>Submit Dispute</strong></Button>
                         </CardActions>

                    </Card>
                </Col>
                <Col xs={0} md={2}>
                </Col>
            </Row>      
        </Container>

        <br />



      

      <Container>
        <Row>
          <Col xs={0} md={2}>
          </Col>

          <Col xs={12} md={8}>
            <Card className="FaucetInterface" style={{backgroundColor: "pink"}}>
                <CardContent>
                </CardContent>
                <CardActions style={{justifyContent: "center"}}>
                        <Button href={"https://app.daohaus.club/dao/0x" + networkId + "/" + juryDAOAddress + "/proposals"} color="info" size="small" ><strong>Visit the Court Room</strong></Button>
                    </CardActions>
            </Card>

          </Col>

          <Col xs={0} md={2}>
          </Col>

        </Row>

        
      </Container>


      
    </div>
  )
}
