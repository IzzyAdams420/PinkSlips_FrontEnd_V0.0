import getWeb3 from "./getWeb3";
import React, { Component } from "react";


import PinkSlips from "./contracts/PinkSlips.json";
import RedPens from "./contracts/RedPens.json";

import redPenIcons from './icons/redPenIcon.png';

import "./App.css";
import "./styles.css";

import Navbar from 'react-bootstrap/Navbar'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



class PinkSlipsInterface extends Component {
  state = { };

  componentDidMount = async () => {
    try {

      this.setState(this.props, this.getLivePrice);

      this.updateForms = this.updateForms.bind(this);
      
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  mintBadge = async () => {

    const { accounts, pinkSlips, sendTo, reason } = this.state;

    const sendToAddress = this.state.sendTo;
    const badge = pinkSlips;

    await badge.methods.issueBadge(sendTo, reason).send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    const response = await badge.balanceOf(sendTo).call();

    // Update state with the result.
    this.setState({ storageValue: response });
  };

  approvePens = async () => {
    const { accounts, pinkSlipsAddress, redPens } = this.state;

    // Stores a given value, 5 by default.
    await redPens.methods.approve(pinkSlipsAddress, "11111111111111111111111111111111111111111").send({ from: accounts[0] });
  };

  getLivePrice = async () => {
 
    const { web3, pinkSlips } = this.state;
    let badge = pinkSlips;
    let livePrice = await badge.methods.mintingCost().call();
    livePrice = web3.utils.fromWei(livePrice);

    this.setState({mintingCost: livePrice});
  }
  
  onMintClick(event) {
    event.preventDefault();
  }
  updateForms(event) {
    event.preventDefault();
    const target = event.target;
    const value = target.value;
    const name = target.name;
    //const target = event.target;

    this.setState({[name]: value});
  }

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="PinkSlipsInterface">
        <h1>⭐ Pink ⭐ Slips ⭐</h1>
        <h2>Now you know if someones a chad!</h2>
        <br />
          <br></br>
        <br></br>
   
    
    <Container fluid>

            <Row>
              <Col sm={2}>

              </Col>
              <Col id='quoteContainer' sm={4}>
                <div className='tokenMeter'>
                  <img className='tokenIcon' id='redPenIcon' src={redPenIcons} />
                  <img className='tokenIcon' id='redPenIcon' src={redPenIcons} />
                  <img className='tokenIcon' id='redPenIcon' src={redPenIcons} />
                </div>
                    <br></br>
                    <br></br>
                  <div className="priceLabel">
                    Minting a GoldenStar costs: <div id='priceQuote'><span id='priceNumber'>{this.state.mintingCost}</span> Red Pens</div>
                  </div>
                  <b>(50% of the minting costs is transferred to the gold star receiver)</b>
                   
              </Col>

              <Col id='issueContainer' sm={4}>
              <br></br>
                <form onSubmit={this.onMintClick}>
                  <input
                    type="text"
                    name="sendTo"
                    placeholder="0x_the_chads_wallet"
                    value={this.state.sendTo}
                    onChange={this.updateForms}
                  />
                  <br></br>
                  <br></br>
                  <textarea
                    name="reason"
                    placeholder="Reason they're a chad"
                    value={this.state.reason}
                    onChange={this.updateForms}
                  />

                  <br></br>
                  <br></br>
                 
                    <button onClick={this.approvePens} value="Approve !Red">
                        {this.state.pensApproved ? "Approved" : "Approve" }
                    </button>
                    <button onClick={this.mintBadge} value="Mint!">
                        Mint!
                    </button>
                    <br />------------<br />
                    <input type="submit" value="Send it" />
                </form>
                  
              </Col>
              <Col sm={2}>

              </Col>

            </Row>

        

          </Container>
        <br></br>
        <br></br>
        <span id="infoBox">
          <strong>***</strong>
          <br /><br />
          GoldenStars are non-removable ERC-721s that include a log of each and
          every generous move by a particular wallet.
          <br /> <br /><strong>***</strong> <br />
          Issue one now!
          
        </span>
      </div>
    );
  }
}

export default PinkSlipsInterface;
