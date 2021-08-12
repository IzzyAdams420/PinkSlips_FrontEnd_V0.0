import React, { process, Component, useCallback, useRef, useState } from "react";


import { toPng } from 'html-to-image';
//import { NFTStorage, File } from 'nft.storage'

import {getIDBadgeInfo} from "../functions/BadgeFunctions.js";
import {uploadIDBadge, uploadGenericBadge, NFTContent} from "../functions/IPFSInteractions.js";


import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import download from 'downloadjs';

import 'bootstrap/dist/css/bootstrap.min.css';
import "../css/badges.css"
import "../css/App.css";
import "../css/styles.css";

import baseLayerGold from '../rsrc/imgs/GoldStarBase.png';
import baseLayerPink from '../rsrc/imgs/pinkSlipsBase.png';
import baseLayerID from '../rsrc/imgs/coloredIDBase.png';
import paperPink from '../rsrc/imgs/pinkSlipsPaper.png';
import { url } from "vfile-message";

const reasonCharLimit = 47;

const trimAddress = (_address, charLimit) => {

      const chunkSize = (charLimit - 5) / 2 ;
      const totalLength = _address.length;

      if (_address){
        const trimmedAddress = _address.slice(0, chunkSize + 2) + "..." + _address.slice(totalLength - chunkSize, totalLength);
        return trimmedAddress.toLowerCase();
      } else return "0x000...0000";

}

const trimReason = (reason, charLimit) => {
    if (reason != null && reason.length > charLimit) {
        const trimmedReason = reason.slice(0, (charLimit - 3)) + "...";
        return trimmedReason;
    } else return reason;
}

const getIdentityBadgeInfo = async (badgeTokenId, badge) => {
  const _owner = badge.methods.ownerOf(badgeTokenId);

  const { _pseudonym, _socialHandle, _avatarTokenAddress, _avatarTokenId} =
      await badge.methods.IDCardInfo(parseInt(badgeTokenId));
  /*
  const _pseudonym = badge.methods.getBadgeSender(badgeTokenId).call();
  const _socialHandle = badge.methods.getBadgeReason(badgeTokenId).call();
  const _avatarTokenAddress = badge.methods.getBadgeReason(badgeTokenId).call();
  const _avatarTokenId = badge.methods.getBadgeReason(badgeTokenId).call();
  */

  const _URI = badge.methods.tokenURI(badgeTokenId).call();

  const badgeToReturn = {
      tokenId: badgeTokenId,
      owner: _owner,
      pseudonym: _pseudonym,
      socialHandle: _socialHandle,
      avatarTokenAddress: _avatarTokenAddress,
      avatarTokenId: _avatarTokenId,
  }

  return badgeToReturn;

}


export default function BadgeImageGenerator (props)  {


    const badge = props.badge;
    const badgeTypeId = props.badge.badgeTypeId;
    const badgeTokenId = props.badgeTokenId;

    const badgeInfo = props.isIdentity ? getIdentityBadgeInfo(badgeTokenId, badge) : "null";

    const badgeReason = trimReason(props.badgeReason, 47);
    const badgeSender = (props.badgeSender ? (trimAddress(props.badgeSender, 13)) : "null" );

    const badgeHolderAddress = props.isIdentity ? "null" : "null";
    const badgeHolderPsuedonym = "Izzy Adams 420"; // THIS IS JUST TMEPORARY

    const fileName = badge.name + "_" + badgeTokenId.toString();

    const [metadata, setMetadata] = useState(null);

    const badgeTip = props.badgeTip;

    const dotenv = require('dotenv').config();
    const disputeIMG = useRef();

    //const apiKey = proccess.env.NFT_STORAGE_API_KEY;
    //const client = new NFTStorage({ token: apiKey });
    
    const ref = useRef<HTMLDivElement>(null);

    
    const imagePrefs = {
      backgroundColor: "transparent",
      width: "490",
      height: "300",
    }
 
    const generatePNG =  () => {

      return BadgeImg().toPng(document.getElementById('badgeImage'), imagePrefs);
      
    }

    const downloadPNG = async () => {

        download(await generatePNG(), fileName);
 
    }

    let avatarImage = new Image();
    const [nftLoaded, setNftLoaded] = useState(null); 

    const LoadNFT = async () => {

      const avatarImageData = await NFTContent("0xeCe93bEa6a8bC38a270b9b0d2434E7FF699F9950","84");
      
      avatarImage.src = avatarImageData;

      setNftLoaded(true);

      return (
        <img src={avatarImageData} />        
      );
    
    }
    
    const exportPNG = async () => {

      const avatarImageData = await NFTContent("0xeCe93bEa6a8bC38a270b9b0d2434E7FF699F9950","84");
      
      avatarImage.src = avatarImageData;

      /*

      const _imageData = await generatePNG();
      const _badgeInfo = await getIDBadgeInfo(badge, badgeTokenId);
      const _metadata = await uploadIDBadge(_imageData, _badgeInfo );
      setMetadata(_metadata);
      return metadata;
      */
    
    }

    const BadgeImg = () => {

      const badges = [
        0,
        pinkSlipsImg(),
        goldStarsImg(),
        ColoredID(),
      ]

      let badgeImg = badges[badgeTypeId];
      return badgeImg;

    }


    const goldStarsImg = () => {

      return (
        <Col   style={{
          backgroundColor: "transparent", padding: 4, position: "relative", top: 0, left: 15, width: 500, height: 300}} >
            <div >
              <h1 className="goldSender">
                  {badgeSender}
              </h1>
              <h1 className="goldTip">
                  {badgeTip} <span className="goldTipAmount">!RED</span>
              </h1>
              <h1 className="goldReason">
                  {badgeReason}
              </h1>
            </div>
            <img style={{zIndex: 2, position: "absolute", top: 0, left: 0}} src={baseLayerGold} /> 
          </Col>  
      );
    }

    const pinkSlipsImg = () => {

      return (
        <Col   style={{
          backgroundColor: "transparent", padding: 4, position: "relative", top: -4, left: 3, width: 500, height: 300}} >
          <div >
            <h1 className="pinkSender">
                {"from " + badgeSender}
            </h1>

            <h1 className="pinkReason">
                {badgeReason}
            </h1>
          </div>
          <img style={{zIndex: 1, position: "absolute", top: 0, left: 0}} src={paperPink} />
          <img style={{zIndex: 3, position: "absolute", top: 0, left: 0}} src={baseLayerPink} />
        </Col>
      );
    }


    const ColoredID =  () => {

      // Dummy content. Have to build out a function to get NFT data
      //const contentID = getNFTContent("0x16baF0dE678E52367adC69fD067E5eDd1D33e3bF","3353");
      //const avatarURL = `url("https://ipfs.infura.io/ipfs/` + contentID + `")`;
      //const nftImage = NFTContent("0x16baF0dE678E52367adC69fD067E5eDd1D33e3bF","3353");

      // const NFT = useNft("0xeCe93bEa6a8bC38a270b9b0d2434E7FF699F9950","84");
      // nft.loading is true during load.
      //if (NFT.loading) console.log("Loading");

      // nft.error is an Error instance in case of error.
      //if (NFT.error) console.log("Error: " + NFT.error);

      return (
        <>
        
          
          <Col style={{
            backgroundColor: "transparent", padding: 4, position: "relative", top: -3, left: 3, width: 500, height: 300}} >
            <div >
              <h1 className="coloredIdHolder">
                  {nftLoaded ? avatarImage.src : badgeHolderPsuedonym}
              </h1>
              <h1 className="coloredIdTokenId">
                {badgeTokenId}
              </h1>
            </div>
            {/**/ <div className="coloredIdAvatar"
                style={{backgroundImage: null }}> 
            </div> /**/}
            <img style={{zIndex: 2, position: "absolute", top: 0, left: 0}} src={baseLayerID} />
            </Col>
          
        </>
      );

    }
    


  return BadgeImg(); 
/*
      <Container onClick={() => {LoadNFT()}} style={{ backgroundColor: "transparent", width: 500, height: 300}}>
        <Row   id="badgeImage" ref={disputeIMG} style={{padding: 3, justifyContent: "center"}}>
          {BadgeImg()}    
        </Row>
      </Container>
      */
      

}
