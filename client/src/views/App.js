import React, { Component } from "react";
import { useLocation, Route, Switch, Redirect } from "react-router-dom";
import getWeb3 from "../components/getWeb3";

import SamplePage from "../pages/samplepage";

import {Container, Row, Col} from 'react-bootstrap';

import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';

import Web3Prompt from "../components/Web3Prompt";

import GoldStars from "../contracts/GoldStars.json";
import PinkSlips from "../contracts/PinkSlips.json";
import RedPens from "../contracts/RedPens.json";
import JuryPool from "../contracts/JuryPool.json";

import routes from "../routes.js";

import Sidebar from "./Sidebar.js";


import 'bootstrap/dist/css/bootstrap.min.css';


import "../css/App.css";
import "../css/styles.css"

class App extends Component {
  state = { web3: null, accounts: null, drawerIsOpen: false};
  appBorderRadius = "1vh"

  componentDidMount = async () => {
      // Get network provider and web3 instance.
      try {
        // Get network provider and web3 instance.
        const web3 = await getWeb3();
  
        // Use web3 to get the user's accounts.
        const accounts = await web3.eth.getAccounts();      
  
        // Get the contract instance.
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = await [GoldStars.networks[networkId],
                                        RedPens.networks[networkId],
                                        PinkSlips.networks[networkId],
                                        JuryPool.networks[networkId]];
  
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
  
        const juryPool = new web3.eth.Contract(
          JuryPool.abi,
          deployedNetwork[3] && deployedNetwork[3].address
        );
        
        const activeContracts = {goldStars, redPens, pinkSlips, juryPool};
  
  
        const goldStarsAddress = deployedNetwork[0].address;
        const pinkSlipsAddress = deployedNetwork[2].address;
        const juryPoolAddress = deployedNetwork[3].address;
  
        this.setState({ web3, accounts, goldStars, redPens, pinkSlips, juryPool,
                        goldStarsAddress, pinkSlipsAddress, juryPoolAddress, activeContracts});
  
      } catch (error) {
        // Catch any errors for any of the above operations.
        alert(
          `Failed to load web3, accounts, or contract. Check console for details.`,
        );
        console.error(error);
      }
    };
  

  mapRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/home") {
        return (
          <Route
          
              path={prop.layout + prop.path}
              component={() => <prop.component toggleDrawer={this.toggleDrawer} {...this.state} />}
              key={key}
          />
        );
      } else {
        return null;
      }
    });
  };


  toggleDrawer = (event) => {
    const isOpen = this.state.drawerIsOpen;
    this.setState({drawerIsOpen: !isOpen});
  }

  render() {
    if (!this.state.web3) {
      return <>
          <div className="App" style={{paddingTop: "30vh", height: "100vh", justifyContent: "center"}} >
          <Web3Prompt style={{positionTop: "30vh !important",}} connectWallet={this.connectWallet}/>
          <button onClick={() => {this.connectWallet()}}> Connect! </button>
        </div></>
    }
    return (
      <div className="App" style={{height: "100vh" ,  margin:0, padding: "2vh", justifyContent: "center"}}>
        <Container fluid style={{verflowY: 'scroll', overflowX: 'hidden', borderRadius: this.appBorderRadius, height: "97vh", backgroundColor: "#536267", position: "fixed", positionTop:"0px", positionRight: "0px", padding: 0}} >    
          <Row style={{ boxShadow:2}} >
            <div className="navigation-drawer" id={this.state.drawerIsOpen ? "drawerShadow" : ""}
            style={{ overflow: 'hidden', borderRadius: this.appBorderRadius, position: "fixed", height: "97vh", padding: 0, margin: 0 }}>
              <Col style={{overflow: 'hidden', position: "fixed", width: "250px", height:  "94vh"}}>
                <Sidebar>

                </Sidebar>
              </Col>
              
            </div>
        
            <div className="content-window" id={this.state.drawerIsOpen ? "contentWindowBorder2" : ""}
            style={{overflowY: 'scroll', overflowX: 'hidden', borderRadius: this.appBorderRadius, position: "fixed", alignContent: "center",
                    justifyContent: 'center', height: "97vh", padding: 0, margin: 0, marginLeft: (this.state.drawerIsOpen ? "250px" : 0) , }}>            
            <Switch>
              {this.mapRoutes(routes)}
              <Redirect from="*" to="/MintingDesk" />
            </Switch>   
            </div>
          </Row>
        </Container>
      </div>  
    );
  }
}

export default App;
