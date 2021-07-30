import getWeb3 from "../components/getWeb3";
import React, { Component } from "react";



import GoldStars from "../contracts/GoldStars.json";
import RedPens from "../contracts/RedPens.json";

import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';

import ListGroup from 'react-bootstrap/ListGroup';

import redPenIcons from '../icons/redPenIcon.png';

import "../css/App.css";
import "../css/styles.css";

import Navbar from 'react-bootstrap/Navbar'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



class GoldStarsInterface extends Component {
  state = { pensApproved: false};

  componentDidMount = async () => {
    
   
      await this.setState(this.props, this.getLivePrice);

      this.updateForms = this.updateForms.bind(this);

      await this.checkPenApproval();
      let canSpend = (parseInt(this.state.pensApproved) >= parseInt(this.state.mintingCost))
      this.setState({canSpend});
      
  };

  mintBadge = async () => {

    const { accounts, goldStars, receivingAddress, issueReason } = this.state;

    const badge = goldStars;

    await badge.methods.issueBadge(receivingAddress, issueReason).send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    const response = await badge.balanceOf(receivingAddress).call();

    // Update state with the result.
    this.setState({ storageValue: response });
  };

  checkPenApproval = async () => {

    if (this.state.accounts != null) {
      const {web3, mintingCost} = this.state;

      let spender = this.props.goldStarsAddress;
      let owner = this.props.accounts[0];
      

      let pensApproved = await this.props.redPens.methods.allowance(owner, spender).call();
      let userBalance = await this.props.redPens.methods.balanceOf(owner).call();
      userBalance = this.props.web3.utils.fromWei(userBalance);
      pensApproved = this.props.web3.utils.fromWei(pensApproved);
    
      this.setState({pensApproved, userBalance});
      return pensApproved;
    } else {
      return 0;
    }  
    };



  approvePens = async () => {
    const { accounts, goldStarsAddress, redPens } = this.props;

    // Stores a given value, 5 by default.
    await redPens.methods.approve(goldStarsAddress, "42069000000000000000000").send({ from: accounts[0] })
    .then(async (receipt) => {
      this.checkPenApproval();
    });
    
  };

  getLivePrice = async () => {
    if (this.state.accounts != null) {
      const { web3, goldStars } = this.state;
      let mintingCost = await goldStars.methods.mintingCost().call();
      mintingCost = parseInt(web3.utils.fromWei(mintingCost));

      this.setState({mintingCost});

      return mintingCost; 
    } else {
      let mintingCost = "?";
      this.setState({mintingCost});
      return mintingCost
    }

  };
  
  onMintClick(event) {
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
      <div className="GoldStarsInterface">
        <h1>
          <span role="img">⭐</span>
          <span id="goldHeader">{" Golden "}</span>
          <span role="img">⭐</span>
          <span id="goldHeader">{" Stars "}</span>
          <span role="img">⭐</span>
        </h1>
        <div id="goldSubHeader">Now you know if someones a chad!</div>
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
                              <Button lg={8} as={InputGroup.Append}
                              onClick={ this.props.accounts ? ((parseInt(this.state.pensApproved)
                                >= parseInt(this.state.mintingCost)) ? this.mintBadge : this.approvePens) : (() => {(window.location.reload())})} variant="warning"
                                id="dropdown-basic-button" title="Mint!">
                                { this.props.accounts ? ( (parseInt(this.state.pensApproved) >= parseInt(this.state.mintingCost)) ? "Mint!" : "Approve!") : "Connect"}
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

export default GoldStarsInterface;
