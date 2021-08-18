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

import {GetNFTImage} from './GetNFTImage.js';
import BadgeImageGenerator from './BadgeImageGenerator.js';

import redPenIcons from '../icons/redPenIcon.png';
import headerImage from '../rsrc/imgs/Chad_Banner.png';
import { pink } from "@material-ui/core/colors";



export default function PassportAgent(props) {

    const [badge, setBadge] = useState(props.badge);
    const [badgeType, setBadgeType] = useState(props.badge ? [props.badge] : 0);
    

    const [userBalance, setUserBalance] = useState(props.userBalance);
    const [pensApproved, setPensApproved] =  useState(false);
    const [mintingCost, setMintingCost] = useState('?');

    const [avatarAddress, setAvatarAddress] = useState(null);
    const [avatarTokenId, setAvatarTokenId] = useState(null);
    const [pseudonym, setPseudonym] = useState(null);
    const [socialHandle, setSocialHandle] = useState(null);
    const [socialLink, setSocialLink] = useState(null);
    const [receivingAddress, setReceivingAddress] = useState(null);
    
    const [imageData, SetImageData] = useState(null);

    const contract = badge.contract;
    const badgeTypeId = 3;

    const disputeIMG = useRef();
    const imagePrefs = {
      backgroundColor: "transparent",
      width: "490",
      height: "300",
    }
 

    const badgeName = [

      "badge",
      "PinkSlip",
      "GoldStar",
      "Colored ID"

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

     // download(await generatePNG(), fileName);

    }

    const badgeTitle = [
      "Minting Desk",
      <>
        <h1>
          <span role="img" id="skull">☠</span> <span id="pinkHeader">Pink</span> 
          <span role="img" id="skull">☠</span> <span id="pinkHeader">Slips</span>
          <span role="img" id="skull">☠</span>
        </h1>
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
      </>,
      <>
      <h1 >Apply Below</h1>
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
      {
        icon: "⭐",
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

    const coloredGradient = "linear-gradient(90deg, rgba(255,255,255,1) 13%, rgba(251,140,243,1) 18%, rgba(169,123,233,1) 21%,"
                            + "rgba(4,89,213,1) 24%, rgba(47,137,225,1) 27%, rgba(132,234,249,1) 28%, rgba(130,255,249,1) 30%,"
                            + " rgba(55,215,71,1) 33%, rgba(245,255,72,1) 36%, rgba(247,218,72,1) 38%, rgba(255,72,72,1) 41%,"
                            + " rgba(255,255,255,1) 46%)";
    const badgeColor = ["aliceblue", "pink", "rgba(245, 201, 7)", coloredGradient];






    const handleBadgeChange = (event) => {

      if (event.target.value) setBadge(props[event.target.value]);
      if (event.target.value == 0) setBadge(0);
      setBadgeType([event.target.value]);
      //setBadgeAddress(props.[event.target.value + "Address"]);
    };
  
    const handleAvatarTokenId = (event) => {

      if (Number.isInteger(parseInt(event.target.value))) {
        setAvatarTokenId(event.target.value);
      } else {
        alert("Please enter a number");
      }
    
    };
    
    const handleAvatarAddress= (event) => {

        setAvatarAddress(event.target.value);
    
    };
  
    const handlePseudonym = (event) => {
      setPseudonym(event.target.value);
      event.preventDefault();
    };

    const handleSocialHandle = (event) => {
      setSocialHandle(event.target.value);

    };

    const handleSocialLink = (event) => {
      setSocialLink(event.target.value);
  
    };

    const handleReceivingAddressChange = (event) => {
      setReceivingAddress(event.target.value);
    }

  const addressIsValid = (address) => {
      const web3 = props.web3;
      const _address = web3.utils.toChecksumAddress(address);
       if (props.web3.utils.isAddress(_address))
       {
           return _address;
       } else {
           return false;
       }
   };
 

    const formIsValid = () => {

      const _avatarAddress = addressIsValid(avatarAddress);
      const _avatarTokenId = addressIsValid(avatarAddress);

       // if( Number.isInteger(parseInt(badgeId))
      //      && parseInt(badgeId) > 0 
      //      && badgeAddress != null )
      //  {
     //       return true;
      //  } else {
      if (_avatarAddress && Number.isInteger(avatarTokenId)) {
        setAvatarAddress(_avatarAddress);
        return true;
      } else {
        return false;
      }
    };
  
    const submitDispute = async () => {
      //const disputeId = await courtClerk.methods.submitDispute( badgeId, badgeAddress, _txData2).send({from: props.accounts[0]});
    }

  const TopBanner = () => {
    return (
        <Card className="ColoredIDHeader" style={{backgroundColor: badgeColor[badgeTypeId]}}
        onClick={ formIsValid ? submitDispute : (null) }>
        <CardContent style={{marginTop: 40}}>
        <Typography variant="h4" component="h2">
                {badgeTitle[badgeTypeId]}
        </Typography>
        <img style={{width: "500px"}} src={imageData} />
        <Button onClick={getAvatar} > Get Avatar! </Button>
        </CardContent>

        
        <Typography variant="h5" component="h2">                
            <span style={{ filter: badgeEmoji[badgeTypeId].filter, textAlign: "center", position: "relative", top: "25px", right: "20%", fontSize: "820%"}}>
              {badgeEmoji[badgeTypeId].icon}
            </span>
        </Typography>
    </Card>
    )
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
/*
    const badgeImageData = await generatePNG();
    const tokenId = 2; // await contract.methods.nextTokenId().call();

    const badgeInfo = {
        name: badge.name,
        description: reason,
        reason: reason,
        sender: props.accounts[0]
    };

    const contentURL = await uploadGenericBadge(badgeImageData, badgeInfo);
    const hashPipe = contentURL;
    const _badgeTip = props.web3.utils.toWei(badgeTip.toString());
    const response =  (
      (badge.badgeTypeId > 1)
      ?
      (
        await contract.methods.issueBadge(receivingAddress, reason, _badgeTip, hashPipe)
              .send({ from: props.accounts[0] })
      )
      :
      (
        await contract.methods.issueBadge(receivingAddress, reason, hashPipe)
              .send({ from: props.accounts[0] })
      )
      );
    
    
    console.log("Hash path:" + hashPipe + " - Returned(eth):" + response);
    return response;

*/
  };

  const getAvatar = async () => {
    const _image = await GetNFTImage("0x3Fb8af6285F63a3c121605C66De20060c6B6ECb2", "7", props.web3);
    SetImageData(_image);
  }
  const checkPenApproval = async () => {
    return 0;
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

  const BadgePreviewBox = () => {
    return (
      <Container fluid>
        <Row>
            <Col xs={12} md={12}>
                <BadgePreview />
            </Col>
        </Row>      
      </Container>);
}

const BadgePreview = () => {
  return (
 
                        <BadgeImageGenerator
                              badge={badge}
                              badgeSender={props.accounts[0]}
                              pseudonym={(pseudonym && (pseudonym.length >= 17)) ? pseudonym.slice(0, 18) : pseudonym}
                              badgeTokenId={42069}
                              // badgeTip={badgeTip ? badgeTip : 1}
                              web3={props.web3}
                            />    

                );
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

        <Container>
            <Row>
                <Col xs={12} md={12}>
                <Card className="MintingTileForm" >
                        <CardContent>

                           
                            <Container fluid>
                              
                                <Row style={{padding: "1vw", paddingTop: "3vh", paddingBottom: "3vh", justifyContent: "center"}}>
                                  <Col xs={12} m={7} lg={7} style={{position: "relative"}}>
                                    <BadgePreview />
                                  
                                  </Col>
                                    
                                  <Col xs={12} m={4} lg={4} >
                                    <Row>
                                      <TextField id="badge-token-id-input" label="Avatar Address" value={avatarAddress}
                                          onChange={handleAvatarAddress} />
                                    </Row>
                                    <Row>
                                      <TextField id="badge-token-id-input" label="Avatar Token ID" value={avatarTokenId}
                                          onChange={handleAvatarTokenId} />
                                    </Row>
                                    <Row style={{ paddingTop: "2vh" }} >
                                      <Button onClick={downloadPNG} color="secondary" size="small" ><strong>Save Image</strong></Button>
                                      <h5>(Don't worry, we'll upload it to IPFS too)</h5>
                                  </Row>
                                  </Col>
                                </Row>
                                
                                <Row>
                                    <TextField
                                    id="pseudonym"
                                    label="Your Psuedonym"
                                    helperText="Whatever you want..."
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    style={{opacity: .75}}
                                    value={pseudonym}
                                    placeholder="Psuedonym"
                                    onChange={handlePseudonym}
                                    />
                                </Row>

                                <Row>
                                    <TextField
                                    id="social-handle"
                                    label="Twitter Handle"
                                    helperText="Must be an ACTIVE twitter"
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    style={{opacity: .75}}
                                    value={socialHandle}
                                    placeholder="@YourTwitter"
                                    onChange={handleSocialHandle}
                                    />
                                </Row>

                                <Row>
                                    <TextField
                                    id="verification-link"
                                    label="Twitter Verification"
                                    helperText="(You can delete it after verification is complete)"
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="filled"
                                    value={socialLink}
                                    placeholder="Link to Verification Tweet"
                                    onChange={handleSocialLink}
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
