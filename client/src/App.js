import React, { Component } from "react";
import getWeb3 from "./getWeb3";
import GoldStarsInterface from "./GoldStars_Interface";
import PinkSlipsInterface from "./PinkSlips_Interface";
import PinkSlipsInterface2 from "./PinkSlips2_Interface";
import BadgeSearch from "./Badge_Search";
import NavigationBar from "./Navigation";


import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


import Web3Prompt from "./Web3Prompt";

import AboutBadges from "./AboutBadges";

import headerImage from './rsrc/imgs/ColoredBadgesHeader.png';

import GoldStars from "./contracts/GoldStars.json";
import PinkSlips from "./contracts/PinkSlips.json";
import RedPens from "./contracts/RedPens.json";



import 'bootstrap/dist/css/bootstrap.min.css';


import "./App.css";

class App extends Component {
  state = { web3: null, accounts: null, goldStars:null, redPens:null, pinkSlips:null, goldStarsAddress:null, pinkSlipsAddress:null};

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();      

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = await [GoldStars.networks[networkId],
                                      RedPens.networks[networkId],
                                      PinkSlips.networks[networkId]];

      //set the contract addresses

      const goldStars = new web3.eth.Contract(
        GoldStars.abi,
        deployedNetwork[0] && deployedNetwork[0].address,
      );

      const redPens = new web3.eth.Contract(
        RedPens.abi,
        deployedNetwork[1] && deployedNetwork[1].address,
      );

      const pinkSlips = new web3.eth.Contract(
        PinkSlips.abi,
        deployedNetwork[2] && deployedNetwork[2].address,
      );
      
      const activeContracts = {goldStars, redPens, pinkSlips};


      const goldStarsAddress = deployedNetwork[0].address;
      const pinkSlipsAddress = deployedNetwork[2].address;
      this.setState({ web3, accounts, goldStars, redPens, pinkSlips,
                      goldStarsAddress, pinkSlipsAddress, activeContracts});

    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  

  render() {
    if (!this.state.web3) {
      return  <div className="App" ><NavigationBar class="white" /><Web3Prompt connectWallet={this.connectWallet}/> </div>
    }
    return (
      <div className="App" style={{justifyContent: 'center'}}>
        
        <NavigationBar class="white" />
        {/*<img alt="Header" src={headerImage} />*/}
        <AboutBadges />
        <br />
        <br />
        <br />
        <Container fluid style={{alignContent: "center", minWidth:"380px", maxWidth:"1100px", justifyContent: 'center', margin: "0 auto"}} >
          <Row>
            <Col>
              <PinkSlipsInterface2 {...this.state} />
              <GoldStarsInterface {...this.state} />

              <br />
              <BadgeSearch {...this.state} />
              <br /><br />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
