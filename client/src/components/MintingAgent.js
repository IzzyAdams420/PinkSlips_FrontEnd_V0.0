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

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import 'bootstrap/dist/css/bootstrap.min.css';
import "../css/App.css";
import "../css/styles.css";

import redPenIcons from '../icons/redPenIcon.png';
import headerImage from '../rsrc/imgs/Chad_Banner.png';
import { pink } from "@material-ui/core/colors";



export default function MintingAgent(props) {

    const badge = props.badge;
    const userBalance = props.userBalance;
    const mintingCosts = props.mintingCosts;

    const [badgeType, setBadgeType] = useState(0);
    const [badgeTip, setBadgeTip] = useState(0);
    const [reason, setReason] = useState("I'm not a cat...");
    const [receivingAddress, setReceivingAddress] = useState(null);
    

    
    const badgeTypeId = (badgeType == 0) ? 0
                        : (badgeType == "pinkSlips" ? 1
                          : (badgeType == "goldStars" ? 2
                            : 0 )
    );

    const badgeName = [
      "Minting Desk",
      "PinkSlips",
      "GoldStars"
    ];

    const badgeEmoji = [
      {
        icon: "👩‍⚖️",
        filter: "drop-shadow(30px 10px 4px #aaaaaa)"
      },
      {
        icon: "☠☠☠☠☠☠",
        filter: "drop-shadow(0 0 0.75rem white)"
      },
      {
        icon: "⭐⭐⭐",
        filter: "drop-shadow(0 0 0.75rem gray)"
      },
    ];

    const reasonTitle = [
      "Reason for issuance",
      "Dick Move",
      "Chad Move"
    ];

    const walletLabel = [
      "0xWalletAddress",
      "The Dick's Address",
      "The Chad's Address"
    ]

    const badgeColor = ["aliceblue", "pink", "gold"];





    const handleBadgeChange = (event) => {
      setBadgeType([event.target.value]);
      //setBadgeAddress(props.[event.target.value + "Address"]);
    };
  
    const handleTipChange = (event) => {

      if (tipIsValid(event.target.value)) {
        setBadgeTip(event.target.value);
      } else {
        alert("Please enter a number");
      }
    
    };
  
    const handleReasonChange = (event) => {
      setReason(event.target.value);
      event.preventDefault();
    };
    const handleReceivingAddressChange = (event) => {
      setReceivingAddress(event.target.value);
    }

  const tipIsValid = (badgeTip) => {
       if( Number.isInteger(parseInt(badgeTip))
           && parseInt(badgeTip) > 0 )
       {
           return true;
       } else {
           return false;
       }
   };
 

    const formIsValid = () => {
       // if( Number.isInteger(parseInt(badgeId))
      //      && parseInt(badgeId) > 0 
      //      && badgeAddress != null )
      //  {
     //       return true;
      //  } else {
            return false;
       // }
    };
  
    const submitDispute = async () => {
      //const disputeId = await courtClerk.methods.submitDispute( badgeId, badgeAddress, _txData2).send({from: props.accounts[0]});
    }

  const TopBanner = () => {
    return (
      <Card className="FaucetInterface" style={{backgroundColor: badgeColor[badgeTypeId]}}
        onClick={ formIsValid() ? submitDispute : (null) }>
        <CardContent>
        <Typography variant="h4" component="h2">
                {badgeName[badgeTypeId]}
        </Typography>
        <Typography color="textSecondary">
                {"Issue a badge below"}
        </Typography>

        </CardContent>

        
        <Typography variant="h5" component="h2">                
            <span style={{ filter: badgeEmoji[badgeTypeId].filter, textAlign: "center", position: "relative", top: "25px", right: "20%", fontSize: "820%"}}>
              {badgeEmoji[badgeTypeId].icon}
            </span>
        </Typography>
    </Card> 
    )
  }

  const mintingQuoteBox = () => {
    return (
             <>
              <Col id='quoteContainer' md={12}>
                <div className='tokenMeter'>
                  <img className='tokenIcon' id='redPenIcon' src={redPenIcons} />
                  <img className='tokenIcon' id='redPenIcon' src={redPenIcons} />
                  <img className='tokenIcon' id='redPenIcon' src={redPenIcons} />
                </div>
                </Col>
                <Col>
                <div className="priceLabel">
                  Minting a PinkSlip costs: <div id="priceQuote"><span id="priceNumber">{ mintingCosts[2] }</span> Red Pens</div>
                </div>                   
              </Col>
              
             </>
    );
  }



  const AgentFooter = () => {
    return (
      <Card className="FaucetInterface" style={{backgroundColor: badgeColor[badgeTypeId]}}>
        <CardContent>
        </CardContent>
        <CardActions style={{justifyContent: "center"}}>
          <Button href={"https://app.daohaus.club/dao/0x" + props.networkId + "/" + props.juryDAOAddress
                        + "/proposals"} color="info" size="small" ><strong>Visit the Court Room</strong>
          </Button>
        </CardActions>
      </Card>);
  };

  const mintBadge = async () => {


    await props.pinkSlips.methods.issueBadge(receivingAddress, reason).send({ from: props.accounts[0] });

    // Get the value from the contract to prove it worked.
    const response = await badge.balanceOf(receivingAddress).call();

    return response;
  };


  return (
    <div className="MintingAgent" style={{color: "black", alignContent: "left", justifyContent: "center"}}>
        <Container>
            <Row>
                <Col xs={0} md={2}>
                </Col>

                <Col xs={12} md={8}>
                    <TopBanner />
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

                           
                            <Container fluid>
                              <Row>
                              {mintingQuoteBox()}
                              </Row>
                              <br />

                                {
                                  (badgeTypeId == 2)
                                  ?
                                  <Row style={{alignContent: "right", justifyContent: "right" }}>
                                    <Col xs={0} lg={7} >
                                    </Col>
                                    
                                    <Col xs={12} lg={5} >
                                        <TextField id="badge-token-id-input" label="Badge ID" value={badgeTip}
                                            onChange={handleTipChange} />
                                    </Col>
                                  </Row>
                                  :
                                  null
                                }
                                
                                <Row>
                                    <FormControl className="DisputeForm_A" >
                                        <InputLabel id="select-badge-type">Badge Type</InputLabel>
                                            <Select
                                            labelId="demo-simple-select-helper-label"
                                            id="demo-simple-select-helper-label"
                                            value={badgeType}
                                            onChange={handleBadgeChange}
                                            style={{backgroundColor: badgeColor[badgeTypeId], borderRadius: 4}}
                                            >
                                                <MenuItem value={0}>
                                                    <em>Select a badge</em>
                                                </MenuItem>
                                                <MenuItem value={"pinkSlips"}>PinkSlip</MenuItem>
                                                <MenuItem value={"goldStars"}>GoldStar</MenuItem>
                                            </Select>
                                    </FormControl>                                                                                            
                                </Row>
                                
                                <Row>
                                    <TextField
                                    id="reason-for-appeal2"
                                    label={walletLabel[badgeTypeId]}
                                    helperText={"Don't forget, they can dispute thier "
                                    + (badgeTypeId? badgeName[badgeTypeId] : "badge") + "!"}
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    style={{opacity: .75}}
                                    value={receivingAddress}
                                    placeholder="0xWalletAddress"
                                    onChange={handleReceivingAddressChange}
                                    />
                                </Row>

                                <Row>
                                    <TextField
                                    id="reason-for-appeal"
                                    label="Reason for appeal:"
                                    helperText="(Be concise, you can provide more information later in your case thread)"
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="filled"
                                    value={reason}
                                    onChange={handleReasonChange}
                                    />
                                </Row>

                                
                            </Container>
                        </CardContent>

                        <CardActions style={{justifyContent: "center"}}>
                            <Button onClick={mintBadge} color="secondary" size="small" ><strong>Submit Dispute</strong></Button>
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
            <AgentFooter />

          </Col>

          <Col xs={0} md={2}>
          </Col>

        </Row>

        
      </Container>


      
    </div>
  )
}
