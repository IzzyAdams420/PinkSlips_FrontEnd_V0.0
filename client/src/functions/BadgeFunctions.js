

export const getGenericBadgeInfo = async (badge, _tokenId) => {

    const badgeInfo = {
        name: badge.name,
        tokenId: _tokenId,
        owner: await badge.methods.ownerOf(_tokenId).call(),
        sender: await badge.methods.getSender(_tokenId).call(),
        reason: await badge.methods.getReason(_tokenId).call(),
    }

    return badgeInfo;
}   

export const getIDBadgeInfo = async (badge, _tokenId) => {

    const badgeInfo = {
        name: "Name!",
        tokenId: "2",
        owner: "_owner",
        pseudonym: "_pseudonym",
        socialHandle: "_socialHandle",
        avatarTokenAddress: "_avatarTokenAddress",
        avatarTokenId: "_avatarTokenId"
    }

    /*
    const _owner = await badge.methods.ownerOf(_tokenId).call();

    const { _pseudonym, _socialHandle, _avatarTokenAddress, _avatarTokenId} =
        await badge.methods.getBadgeInfo(_tokenId).call();

    const _URI = await badge.methods.tokenURI(_tokenId).call();

    const badgeInfo = {
        name: badge.name,
        tokenId: _tokenId,
        owner: _owner,
        pseudonym: _pseudonym,
        socialHandle: _socialHandle,
        avatarTokenAddress: _avatarTokenAddress,
        avatarTokenId: _avatarTokenId,
    }
    */

    return badgeInfo;

}
