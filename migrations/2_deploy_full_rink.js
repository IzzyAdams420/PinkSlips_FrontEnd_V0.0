
const AddressManager = artifacts.require("AddressManager");

const RedPens = artifacts.require("RedPens");
const Gavels = artifacts.require("Gavels");

const PinkSlips = artifacts.require("PinkSlips");
const GoldStars = artifacts.require("GoldStars");
const ChadBadge = artifacts.require("ChadBadges");

const VendingMachine = artifacts.require("VendingMachine");
const JuryPool = artifacts.require("JuryPool");
const DisputeMachine = artifacts.require("DisputeMachine");

let AddressManagerInstance;

let accounts = [];

// THIS IS LEFT BLANK FOR TESTING THE UI, ALL PERMISSIONS ARE GRANTED TO DEPLOYER.
let firstAdminAddress =  '0xFc961Da137b43B7F0Bf612079FC2f91d9216DdF2';
let RedPensAddress = '0xe78AC7E8d309C749EBC80F55A78B3b397625421C';
let juryDaoAgent = '0x2fc321C703f06893b4C3E872FBd66DC2D7c91f72';
let gavelDaoAgent = firstAdminAddress;
let treasuryAddress = firstAdminAddress;
let theCourtAddress = firstAdminAddress;
let miniBailiff = firstAdminAddress;

let GavelsAddress = '0x82e9b77ed959E617169C387E7977a8c26E33d286';

module.exports = function (deployer) {



  deployer.then(async () => {
    accounts = await web3.eth.getAccounts();
    
  }).then(async () => {
    //let firstAdminAddress = "0xAFfBFc96A767C348FDC3F1fBaF11fDF5B0df65b4"; //'0x76FB5FFCB1d2Ef86472980330BFf71a0c24f5d34';
    //juryDaoAgent = firstAdminAddress;
    gavelDaoAgent = firstAdminAddress;
    treasuryAddress = firstAdminAddress;
    theCourtAddress = firstAdminAddress;
    miniBailiff = firstAdminAddress;
  }).then(async () => {
    await deployer.deploy(AddressManager, juryDaoAgent, gavelDaoAgent, treasuryAddress,
                          theCourtAddress, miniBailiff);
  }) .then(async () => {

    //await deployer.deploy(RedPens, AddressManager.address);
    //await deployer.deploy(Gavels, AddressManager.address);

  }) .then(async () => {

    AddressManagerInstance = await AddressManager.deployed();
    await AddressManagerInstance.setRedPenTokenAddress(RedPensAddress);
    await AddressManagerInstance.setGavelTokenAddress(GavelsAddress);

    
    await deployer.deploy(PinkSlips, AddressManager.address);
    await deployer.deploy(GoldStars, AddressManager.address);
    //await deployer.deploy(ChadBadge, AddressManager.address);
    
    
  }).then(async () => {
    //await deployer.deploy(VendingMachine, RedPens.address);
  })
  .then(async () => {
    //const RedPensInstance = await RedPens.deployed();
    //await RedPensInstance.transfer(VendingMachine.address, "10000000000000000000000");
    //await deployer.deploy(JuryPool, AddressManager.address);
    //await deployer.deploy(DisputeMachine, AddressManager.address);
  }) .then(async () => {
  
    //const RedPensInstance = await RedPens.deployed();
    //const GavelsInstance = await Gavels.deployed();
    
    const PinkSlipsInstance = await PinkSlips.deployed();
    const GoldStarsInstance = await GoldStars.deployed();
    //const ChadBadgeInstance = await ChadBadge.deployed();

    //const JuryPoolInstance = await JuryPool.deployed();
    //const DisputeMachineInstance = await DisputeMachine.deployed();

    await AddressManagerInstance.setPinkSlipAddress(PinkSlips.address);
    await AddressManagerInstance.setGoldStarAddress(GoldStars.address);
    //await AddressManagerInstance.setChadBadgeAddress(ChadBadge.address);
    //await AddressManagerInstance.setJuryPoolAddress(JuryPool.address);
    
    //await RedPensInstance.updateTokenAddresses();
    //await GavelsInstance.updateTokenAddresses();

    await PinkSlipsInstance.updateTokenAddresses();
    await GoldStarsInstance.updateTokenAddresses();
    //await ChadBadgeInstance.updateTokenAddresses();
    //await JuryPoolInstance.updateTokenAddresses();
    //await DisputeMachineInstance.updateTokenAddresses();
    
    
  })

  

}