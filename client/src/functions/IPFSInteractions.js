import react from 'react';
import { create } from 'ipfs-http-client';
import { Component } from 'react';
 
export const uploadIDBadge = async (imageData, badgeInfo) => {
    
    const _fileName = badgeInfo.name +" #" + badgeInfo.tokenId + ".png";

    const client = create('https://ipfs.infura.io:5001/api/v0');

    const image = new File([imageData], _fileName, { type: 'image/png'});

    const _image = await client.add(image);

    const _metadata =`{"name":"${badgeInfo.name}","description":"ID#${badgeInfo.tokenId}","image":"ipfs://${_image.path}"}`;

    const metadata = await client.add(_metadata);

    console.log(metadata);
    console.log(metadata.path);

    return metadata;
}

export const uploadGenericBadge = async (imageData, badgeInfo) => {

    var randomNumber = new Uint16Array(1);
    window.crypto.getRandomValues(randomNumber);
    randomNumber = randomNumber.toString();

    const _fileName = badgeInfo.name + "_" + randomNumber + ".png";

    const client = create('https://ipfs.infura.io:5001/api/v0');

    const image = new File([imageData], _fileName, { type: 'image/png'});
    const _image = await client.add({path: _fileName, content: image}, {wrapWithDirectory: true});
    const imageURL = "ipfs://" + _image.cid + "/" + _fileName;

    const _metadata ={
        name: badgeInfo.name,
        description: badgeInfo.reason,
        image: imageURL
    } 
    const _json = JSON.stringify(_metadata)

    const metadata = await client.add({path: 'metadata.json', content: _json}, {wrapWithDirectory: true});

    console.log("CID:" + metadata.cid);

    const metadataPath = metadata.cid + '/metadata.json';
    console.log(metadataPath);
    return metadataPath;
}

export const NFTContent = async (_NFTAddress, _NFTTokenID) => {

    const client = create('https://ipfs.infura.io:5001/api/v0');

    const contentHash = 'Qmc5yMtaR1auHzzszghkokVWVB93je4s1qU1PeNNsuUuS4';
    console.log("Ready:");
    const metadata = await client.get(contentHash);
    console.log(metadata);
    return metadata;

    /*
    const NFT = await useNft(_NFTAddress, _NFTTokenID);
      // nft.loading is true during load.
    if (NFT.loading) return "Loading…"
    
    // nft.error is an Error instance in case of error.
    if (NFT.error) return "Error."

    var image = new Image();
    image.src = NFT.nft.image;

    // You can now display the NFT metadata.
    return image;
    */
    /*
    NFT = {
        status: (error, loading, or done),
        loading: status === loading,
        error: null or error,
        reload: function to call,
        nft: {
            name:
            description:
            image:
        }
    }
    */
    /*
    if (NFT.loading === false && NFT.error === false) {
        return NFT.nft;
    } else if (NFT.loading === false && NFT.error != false) {
        console.log("Error loading NFT: attempt 1 of 2");
        await NFT.reload();
        if (NFT.loading === false && NFT.error === false) {
            return NFT.nft;
        } else if (NFT.loading === false && NFT.error != false) {
            console.log("Error loading NFT: attempt 2 of 2");            
        }

    }*/
 
    //return NFT;

}
