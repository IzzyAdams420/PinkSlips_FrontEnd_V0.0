import React, { Component, useEffect, useState, useRef } from "react";

import {uploadIDBadge, uploadGenericBadge} from "../functions/IPFSInteractions.js";
import { toBlob, toPng } from 'html-to-image';
import download from 'downloadjs';

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
import InputGroup from 'react-bootstrap/InputGroup';
import ListGroup from 'react-bootstrap/ListGroup';

import 'bootstrap/dist/css/bootstrap.min.css';
import "../css/App.css";
import "../css/styles.css";

import BadgeImageGenerator from '../components/BadgeImageGenerator.js';

import redPenIcons from '../icons/redPenIcon.png';
import headerImage from '../rsrc/imgs/Chad_Banner.png';


import PinkSlipSign from '../rsrc/imgs/PinkSlip.gif';
import GoldStarSign from '../rsrc/imgs/GoldStar.gif';

import { pink } from "@material-ui/core/colors";



export default function MintingAgent(props) {

    const [badge, setBadge] = useState(props.badge);
    const [badgeType, setBadgeType] = useState(props.badge ? [props.badge] : 0);
    

    const [userBalance, setUserBalance] = useState(props.userBalance);
    const [pensApproved, setPensApproved] =  useState(false);
    const [mintingCost, setMintingCost] = useState('?');

    const reasonDeafult = "I'm not a cat...";
    const [badgeTip, setBadgeTip] = useState(0);
    const [reason, setReason] = useState(reasonDeafult);
    const [receivingAddress, setReceivingAddress] = useState(null);
    

    const contract = badge.contract;
    const badgeTypeId = badge ? badge.badgeTypeId : 0;

    const disputeIMG = useRef();
    
    const imagePrefs = {
      backgroundColor: "transparent",
      width: "490",
      height: "300",
    }
 

    const badgeName = [

      "badge",
      "PinkSlip",
      "GoldStar"

    ]

    const flashingSign = [
      null,
      PinkSlipSign,
      GoldStarSign
    ]

    useEffect( () => {

        checkPenApproval();
    });

    const fileName = badge.name;

    const generatePNG = () => {

      // return toPng(document.getElementById('badgeImage'), imagePrefs);
      return toBlob(document.getElementById('badgeImage'), imagePrefs);
    }
    
    const downloadPNG = async () => {

      download(await generatePNG(), fileName);

    }

    const badgeTitle = [
      "Minting Desk",
      <>
        
          <span role="img" id="skull">☠</span> <span id="pinkHeader">Pink</span> 
          <span role="img" id="skull">☠</span> <span id="pinkHeader">Slips</span>
          <span role="img" id="skull">☠</span>
        
        <div id="pinkSubHeader">Now you know if someones a dick!</div>
        <br />      
      </>,
      <>
        <h1>
          <span role="img">⭐</span>
          <span id="goldHeader">{" Golden "}</span>
          <span role="img">⭐</span>
          <span id="goldHeader">{" Stars "}</span>
          <span role="img">⭐</span>
        </h1>
        <div id="goldSubHeader">Now you know if someones a chad!</div>
        <br />
      </>
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

    const reasonLabel = [
      "Reason for issuance",
      "Dick Move",
      "Chad Move"
    ];

    const walletLabel = [
      "0xWalletAddress",
      "The Dick's Address",
      "The Chad's Address"
    ]

    const badgeColor = ["aliceblue", "pink", "rgba(245, 201, 7)"];





    const handleBadgeChange = (event) => {

      if (event.target.value) setBadge(props[event.target.value]);
      if (event.target.value == 0) setBadge(0);
      setBadgeType([event.target.value]);
      //setBadgeAddress(props.[event.target.value + "Address"]);
    };
  
    const handleTipChange = (event) => {

      const _int = (parseInt(event.target.value) ? parseInt(event.target.value) : 0);
      console.log("_int: " + _int);
      if (tipIsValid(_int)) {
        setBadgeTip(_int.toString());
        console.log("Valid Tip");
      } else {
        console.log(`Alert ` + event.target.value );
        alert("Tip must be a number!");
      }
    
    };
  
    const handleReasonChange = (event) => {
      setReason(event.target.value);
      event.preventDefault();
    };
    const handleReceivingAddressChange = (event) => {
      setReceivingAddress(event.target.value);
    }

  const addressIsValid = (address) => {
      const web3 = props.web3;
      try {
        const _address = web3.utils.toChecksumAddress(address);
        if (props.web3.utils.isAddress(_address))
        {
            
            return _address;
        } else {
            return false;
        } 
      } catch (error) {
        console.log("Please Enter A Valid ETH Address");
      }
   };

  const tipIsValid = (badgeTip) => {
       if( (Number.isInteger(parseInt(badgeTip))
           && parseInt(badgeTip) >= 0) || ! badgeTip )
       {
           return parseInt(badgeTip).toString();
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

    };
  
    const submitDispute = async () => {
      //const disputeId = await courtClerk.methods.submitDispute( badgeId, badgeAddress, _txData2).send({from: props.accounts[0]});
    }

  const TopBanner = () => {
    return (
      <Card className="MintingTileHeader" style={{backgroundColor: badgeColor[badgeTypeId]}}
        onClick={ formIsValid() ? submitDispute : (null) }>
        <CardContent style={{marginTop: 40}}>
        <Typography variant="h4" component="h2">
                {badgeTitle[badgeTypeId]}
        </Typography>
        
        {
         badgeTypeId < 1
         ?
         null
         : 
          <Row style={{marginTop: 40, marginBottom: -10}}>
              {mintingQuoteBox()}
          </Row>
        }
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
                  Minting a {badgeName[badgeTypeId]} costs: <div id="priceQuote"><span id="priceNumber">{ mintingCost }</span> Red Pens</div>
                </div>                   
              </Col>
              
             </>
    );
  }



  const AgentFooter = () => {
    return (
      <Card className="MintingTileFooter" style={{backgroundColor: badgeColor[badgeTypeId]}}>
        <CardContent>
          <div id="balanceBar">
            <ListGroup style={{justifyContent: 'center', }} horizontal>
              <ListGroup.Item  id="balanceBoxPink">
                <Button className="retroButton btn btn-light input-group-append" lg={8} as={InputGroup.Append}
                  onClick={ props.accounts ? ((parseInt(pensApproved) >= parseInt(props.mintingCost)) ?
                            mintBadge : approvePens) : (() => {(window.location.reload())})
                          }
                      variant="light" id="dropdown-basic-button" title="Mint!">
                        { props.accounts ? ((parseInt(pensApproved) >= parseInt(mintingCost)) ? "Mint!" : "Approve!") : "Connect"}
                </Button>
              </ListGroup.Item >
              <ListGroup.Item id="balanceBoxPink" >You have: <br /> {props.accounts ? parseInt(props.userBalance) : "? "}
                <span id="redSymbol" >!Red</span>
              </ListGroup.Item> 
            </ListGroup>
          </div>
          
        </CardContent>
        <CardActions style={{justifyContent: "center"}}>
          <Button href={"https://app.daohaus.club/dao/0x" + props.networkId + "/" + props.juryDAOAddress
                        + "/proposals"} color="info" size="small" ><strong>Visit the Court Room</strong>
          </Button>
        </CardActions>
      </Card>);
  };

  const mintBadge = async () => {

    const badgeImageData = await generatePNG();
    const tokenId = 2; // await contract.methods.nextTokenId().call();

    const _receivingAddress = addressIsValid(receivingAddress);
    const validTip = (
      (badge.badgeTypeId > 1)
      ?
      (
        (tipIsValid(badgeTip) > 0)
      )
      :
      (
        true
      )
    );

    const _approved = (pensApproved >= ( mintingCost + badgeTip));

    if (!_receivingAddress || !validTip || !_approved) {
      
      if (!_receivingAddress) console.log("please enter valid address");
      if (!_approved) {
        const toApprove = mintingCost + badgeTip - pensApproved;
        console.log("please approve " + toApprove + " more red pens");
      };
      if (!validTip) console.log("please enter valid tip");
      
      return false

    } else {
        const badgeInfo = {
          name: badge.name,
          description: reason,
          reason: reason,
          sender: props.accounts[0],
          tip: (badgeTip + " !Red")
        };

        const contentURL = await uploadGenericBadge(badgeImageData, badgeInfo);
        const hashPipe = contentURL;
        const _badgeTip = props.web3.utils.toWei(parseInt(badgeTip).toString());
        const response =  (
          (badge.badgeTypeId > 1)
          ?
          (
            await contract.methods.issueBadge(_receivingAddress, reason, _badgeTip, hashPipe)
                  .send({ from: props.accounts[0] })
          )
          :
          (
            await contract.methods.issueBadge(_receivingAddress, reason, hashPipe)
                  .send({ from: props.accounts[0] })
          )
          );
        
        
        console.log("Hash path:" + hashPipe + " - Returned(eth):" + response);
        return response;
    }

    


  };

  const checkPenApproval = async () => {
    
    if (badge) {

      let _mintingCost = await contract.methods.mintingCost().call();
      _mintingCost = props.web3.utils.fromWei(_mintingCost);

      let spender = badge.address;
      let owner = props.accounts[0];
      

      const pensApproved = await props.redPens.methods.allowance(owner, spender).call();
      const userBalance = await props.redPens.methods.balanceOf(owner).call();
      const _userBalance = props.web3.utils.fromWei(userBalance);
      const _pensApproved = props.web3.utils.fromWei(pensApproved);

      setMintingCost(_mintingCost);
      setPensApproved(_pensApproved);
      setUserBalance(_userBalance);
      return _pensApproved;
    } else {
      return 0;
    }
  };

  const approvePens = async () => {
    await props.redPens.methods.approve(badge.address, "42069000000000000000000").send({ from: props.accounts[0] })
    .then(async (receipt) => {
      checkPenApproval();
    });
    
  };

  const getHelperText = () => {
    let text = "Don't forget, they can dispute thier "
    + (badgeTypeId? badgeName[badgeTypeId] : "badge") + "!";
    return text;
  }

  const BadgePreview = () => {
    return (
      <Container fluid>
        <Row>
            <Col xs={12} md={12}>
                <Card className="MintingTileImage" style={{alignContent: "center", justifyContent: "center"}}>
                    <CardContent>
                      <Row>

                      <Container s={3} >
                        <img src={flashingSign[badgeTypeId]} />
                      </Container>

                      <Container s={3} onClick={() => {}} style={{ width: "500px", backgroundColor: "transparent", alignContent: "center", justifyContent: "center"}}>
                        <Row   id="badgeImage" style={{ padding: 0, alignContent: "center", justifyContent: "center"}}>
                        <BadgeImageGenerator
                              badge={badge}
                              badgeSender={props.accounts[0]}
                              badgeReason={reason}
                              badgeTokenId={42069}
                              badgeTip={badgeTip ? parseInt(badgeTip).toString() : 1}
                              web3={props.web3}
                            />   
                        </Row>
                      </Container>

                      </Row>                          
                    </CardContent>

                    <CardActions style={{justifyContent: "center"}}>
                        <Button onClick={downloadPNG} color="secondary" size="small" ><strong>Save Image</strong></Button>
                          <h5>(Don't worry, we'll upload it to IPFS too)</h5>
                    </CardActions>

                </Card>
            </Col>
        </Row>      
      </Container>);
}

  return (
    <div className="MintingAgent" style={{color: "black", alignContent: "center", justifyContent: "center"}}>
        <Container fluid>
            <Row>
                <Col xs={12} md={12}>
                    <TopBanner />
                </Col>
            </Row>      
        </Container>

        <br />

       {
        (badgeTypeId && (receivingAddress || badgeTip || reason != reasonDeafult))
        ?
        <BadgePreview />
        :
        (null)}

        <br />        

        <Container>
            <Row>
                <Col xs={12} md={12}>
                <Card className="MintingTileForm" >
                        <CardContent>

                           
                            <Container fluid>
                              

                                {
                                  (badgeTypeId == 2)
                                  ?
                                  <Row style={{alignContent: "right", justifyContent: "right" }}>
                                    <Col xs={0} lg={7} >
                                    </Col>
                                    
                                    <Col xs={12} lg={5} >
                                        <TextField id="badge-token-id-input" label="Tip Amount" value={badgeTip ? badgeTip : ""}
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
                                            style={{backgroundColor: badgeColor[badgeTypeId], borderStyle: "none", borderRadius: 5}}
                                            disableUnderline
                                            >
                                                <MenuItem value={0}>
                                                    <em>Select a badge color</em>
                                                </MenuItem>
                                                <MenuItem value={"_pinkSlips"}>PinkSlip</MenuItem>
                                                <MenuItem value={"_goldStars"}>GoldStar</MenuItem>
                                            </Select>
                                    </FormControl>                                                                                            
                                </Row>
                                
                                <Row>
                                    <TextField
                                    id="reason-for-appeal2"
                                    label={walletLabel[badgeTypeId]}
                                    helperText={getHelperText()}
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
                                    label={reasonLabel[badgeTypeId]}
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
                             <Button onClick={mintBadge} color="secondary" size="small" ><strong>
                             { props.accounts ? ((parseInt(pensApproved) >= parseInt(mintingCost)) ? "Mint Badge" : "Approve !Red") : "Connect"}
                             </strong></Button>
                         </CardActions>

                    </Card>
                </Col>
            </Row>      
        </Container>

        <br />



      

      <Container>
        <Row>
                  
        </Row>                        
        <Row>
          <Col xs={0} md={0}>
            
          </Col>

          <Col xs={12} md={12}>
            <AgentFooter />

          </Col>

          <Col xs={0} md={0}>
          </Col>

        </Row>

        
      </Container>


      
    </div>
  )
}
