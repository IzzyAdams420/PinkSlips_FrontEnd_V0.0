import React from 'react';
import { create, get } from 'ipfs-http-client';
import { Component } from 'react';



export const GetNFTImage = async (_NFTAddress, _NFTTokenID, _web3 ) => { // send address, token id, web3, and accounts as props


    const txData = await _web3.eth.abi.encodeFunctionCall(
        {
            "inputs": [
            {
                "internalType": "uint256",
                "name": "_tokenId",
                "type": "uint256"
            }
            ],
            "name": "tokenURI",
            "outputs": [
            {
                "internalType": "string",
                "name": "_URI",
                "type": "string"
            }
            ],
            "stateMutability": "view",
            "type": "function",
            "constant": true
        },
        [_NFTTokenID]);

    const _JsonURL = await _web3.eth.call({to: _NFTAddress, data: txData}).then((receipt) => {
        const _receipt = _web3.eth.abi.decodeParameter("string", receipt);
        return _receipt;});
    console.log("JsonURL = " + _JsonURL);

    const _imgData = await getImageFromURI(_JsonURL);

    return _imgData;
}

export const getImageFromURI = async (JsonURL) => {

    // screen for ipfs vs http
    let isIPFS;
    let _imgdata;

    if ((JsonURL[0] == 'h' || JsonURL == "H")
        && (JsonURL[4] == ":" || JsonURL[5] == ":")) {isIPFS = false;}
    
    else if ((JsonURL[0] == 'i' || JsonURL == "I")
        && JsonURL[4] == ":") {isIPFS = true;}
    
    if (isIPFS)
        {_imgdata = await getImageFromIPFS(JsonURL);}
    else if (!isIPFS)
        {_imgdata = await getImageFromHTTP(JsonURL);}

    return _imgdata;
}

export const getImageFromIPFS = async (JsonURL) => {

    const _url = JsonURL.slice(7, JsonURL.length);
    const client = create('https://ipfs.infura.io:5001/api/v0');
    
    const _metadataData = await client.cat(_url);

    for await (const content of _metadataData) {
        console.log('content: ', content);
        const _metadataString = Buffer.from(content).toString('utf8');
        const _metadata = JSON.parse(_metadataString);

        console.log("Metadata: " + _metadata.image);

        const _url = _metadata.image;
        const _imgURL = _url.slice(7, _url.length);
        const _imgRequest = await client.cat(_imgURL);
    
        for await (const content of _imgRequest) {

            console.log("Image URL: " + _imgURL);
            console.log("IPFS Image recieved: " + content);
            const _blobdata = new Uint8Array(content);
            console.log("Blobdata: " + _blobdata);
            const blob = new File([_blobdata], "image.png", {type: "image/png"});
            const _imgdata = URL.createObjectURL(blob);


            console.log("_imgdataString: " + _imgdata);
            console.log("_imgdata " + _imgdata);
    
        return _imgdata;
        }
        
    }
}

export const getImageFromHTTP = async (JsonURL) => {
   
    const _metadataData = await fetch(JsonURL, { mode: 'no-cors' });
    const _metadataString = Buffer.from(_metadataData).toString('utf8');
    const _metadata = JSON.parse(_metadataString);

    const _imgdata = await fetch(_metadata.image);

    console.log("Get metadata from: " + _metadataString);
    console.log("Metadata: " + _metadata);
    console.log("Image recieved: " + _imgdata);

    return _imgdata;
}