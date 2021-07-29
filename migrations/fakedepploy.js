const AddressManager = artifacts.require("AddressManagerInstance");

const BlueBadge = artifacts.require("BlueBadge");

let AddressManagerDeployed;

let RedPensAddress = ''; /*YOUR TOKEN ADDRESS*/ 

let theCourtAddress = ''; /*CENTRAL DAO AGENT/MINION ADDRESS*/

let juryDaoAgent = ''; /*CENTRAL DAO AGENT --OR -- Jury Equivilent*/
let gavelDaoAgent = ''; /*CENTRAL DAO AGENT --OR -- Gavels Equivilent*/
let treasuryAddress = ''; /*YOUR DOA TREASURY/BANK ADDRESS*/

let miniBailiff = ''; /*AGENT WITH SNAPSHOT ABILITY ONLY*/


////////////
/* Set your badge name, symbol (color), and payment settings here. 
    Note: when setting your payment preferences:
        TRUE splits the badge payment with the badge reciver and the treasury */
////////////
let badgeName = "BlueBadge"; /*Add you colored badge name*/
let badgeSymbol = 'blue'; /*Add your colored badge color (or symbol)*/
let doPayReciever = true; /*Set your payment preferences*/



module.exports = function (deployer) {

  deployer.then(async () => {
    await deployer.deploy(AddressManager, juryDaoAgent, gavelDaoAgent, treasuryAddress,
                          theCourtAddress, miniBailiff);
  }) .then(async () => {
    AddressManagerDeployed = await AddressManager.deployed();
    await AddressManagerDeployed.setRedPenTokenAddress(RedPensAddress);
    await deployer.deploy(BlueBadge, badgeName, badgeSymbol, doPayReciever, AddressManager.address);
  }).then(async () => {
    const BlueBadgeDeployed = await BlueBadge.deployed();
    await AddressManagerDeployed.setBlueBadgeAddress(BlueBadge.address); //need to reformat how addressmanager stores badge addresses.
    await BlueBadgeDeployed.updateTokenAddresses();
  })

}