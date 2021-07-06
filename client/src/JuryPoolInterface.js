import getWeb3 from "./getWeb3";
import React, { Component } from "react";

import JuryPool from "./contracts/JuryPool.json";
import RedPens from "./contracts/RedPens.json";

import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';

import ListGroup from 'react-bootstrap/ListGroup';

import redPenIcons from './icons/redPenIcon.png';

import "./App.css";
import "./styles.css";

import Navbar from 'react-bootstrap/Navbar'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



class JuryPoolInterface extends Component {
  state = { pensApproved: false};

  componentDidMount = async () => {
    
   
      await this.setState(this.props);


      this.updateForms = this.updateForms.bind(this);

      await this.checkPenApproval();
      let canSpend = (parseInt(this.state.pensApproved) >= parseInt(this.state.mintingCost))
      this.setState({canSpend}, this.getLiveRate);
      
     try { 

    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  mintBadge = async () => {

  
  };

  checkPenApproval = async () => {
    const {juryPoolAddress} = this.props;

    let spender = juryPoolAddress;
    let owner = this.props.accounts[0];
    

    let pensApproved = await this.props.redPens.methods.allowance(owner, spender).call();
    let userBalance = await this.props.redPens.methods.balanceOf(owner).call();
    userBalance = this.props.web3.utils.fromWei(userBalance);
    pensApproved = this.props.web3.utils.fromWei(pensApproved);
   
    this.setState({pensApproved, userBalance});
    return pensApproved;
    };



  approvePens = async () => {
    const { accounts, juryPoolAddress, redPens } = this.props;

    // Stores a given value, 5 by default.
    await redPens.methods.approve(juryPoolAddress, "42069000000000000000000").send({ from: accounts[0] })
    .then(async (receipt) => {
      this.checkPenApproval();
    });
    
  };

  getLiveRate = async () => {
 
    const { juryPool, redPens, juryPoolAddress } = this.props;
    let totalShares = await juryPool.methods.totalShares().call();
    let totalRedPens = await redPens.balanceOf(juryPoolAddress).call();

    let pensPerShare = totalRedPens / totalShares;

    let shareCost = 1 / parseInt(pensPerShare);

    this.setState({shareCost});

    return shareCost;

  };
  
  onClick(event) {
    event.preventDefault();
  };

  updateForms(event) {
    event.preventDefault();
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({[name]: value});
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="JuryPoolInterface">
        <h1>
          <span role="img">🏦</span>
          <span id="goldHeader">{" Jury "}</span>
          <span role="img">🏦</span>
          <span id="goldHeader">{" Pool "}</span>
          <span role="img">🏦</span>
        </h1>
        <div id="goldSubHeader">Earn Yield, Solve Disputes. The more your stake, the more likely you will be drafted for jury duty.</div>
        <br />
        <br></br>
   
    
    <Container fluid>

            <Row>
              <Col md={2}>

              </Col>
              <Col id='quoteContainer' md={8}>
                <div className='tokenMeter'>
                  <img className='tokenIcon' id='redPenIcon' src={redPenIcons} />
                  <img className='tokenIcon' id='redPenIcon' src={redPenIcons} />
                  <img className='tokenIcon' id='redPenIcon' src={redPenIcons} />
                </div>
                    <br></br>
                    <br></br>
                <div className="priceLabel">
                  {"Minting a GoldenStar costs: "}
                  <div id="priceQuote">
                    <span id="priceNumber">
                      {this.state.mintingCost}
                    </span>
                    {" Red Pens"}
                  </div>
                  
                  <div id="priceInfo">
                        (50% of the minting costs is transferred to the gold star receiver)
                  </div>    
                </div>

                
              </Col>
              <Col sm={2}></Col>
                </Row>
            <Row>
              <Col md={2}></Col>
              <Col id="issueContainer" md={8}>
                  <InputGroup style={{
                              justifyContent: 'center',
                            }}>
                    <Form.Group  md={8}  style={{ width: 1500}}>
                      <Form.Control size="lg" md={8} name="receivingAddress" value={this.state.receivingAddress}
                                        onChange={this.updateForms} placeholder="0x Wallet Address" />
                      <Form.Control md={8} as="textarea" rows={3} name="issueReason" value={this.state.issueReason}
                                        onChange={this.updateForms} placeholder="Reason" />
                      <br />
                      <Col >
                        <div id="balanceBar">
                          <ListGroup style={{
                                justifyContent: 'center',
                              }} horizontal>
                            <ListGroup.Item id="balanceBoxGold" >
                              <Button lg={8} as={InputGroup.Append} onClick={ (parseInt(this.state.pensApproved)
                                >= parseInt(this.state.mintingCost)) ? this.mintBadge : this.approvePens} variant="warning"
                                id="dropdown-basic-button" title="Mint!">
                                { (parseInt(this.state.pensApproved) >= parseInt(this.state.mintingCost)) ? "Mint!" : "Approve!"}
                              </Button>
                            </ListGroup.Item>
                            <ListGroup.Item id="balanceBoxGold" >You have: <br /> {parseInt(this.state.userBalance)}
                              <span id="redSymbol" >!Red</span>
                            </ListGroup.Item> 
                          </ListGroup>
                        </div>
                      </Col>                           
                    </Form.Group>
                  </InputGroup>
                  
              </Col>
              <Col md={2}></Col>

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

export default JuryPoolInterface;
