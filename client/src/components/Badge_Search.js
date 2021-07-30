import getWeb3 from "../components/getWeb3";
import React, { Component, useState, useEffect } from 'react';

import GoldStars from "../contracts/GoldStars.json";
import RedPens from "../contracts/RedPens.json";

import redPenIcons from '../icons/redPenIcon.png';

import "../css/App.css";
import "../css/styles.css";


import Navbar from 'react-bootstrap/Navbar';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import ListGroup from 'react-bootstrap/ListGroup'

import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

//import BadgeSearchResults from "./Badge_Search_Results";
import SearchResults from "../components/Badge_Search_Results";

async function Search(address) {

  const [tokenIDArray, setTokenIDArray] = useState([]);
  const [isLoading, setisLoading] = useState(true);

  let badge = this.state.goldStars;
  let index = 0;

  let balanceResult = await badge.methods.balanceOf(address).call()
                      .then( (result) => {
                        for (index = 0; index < balanceResult; index++ ) {
                            // tokenIDArray[index] = await
                            badge.methods.tokenOfOwnerByIndex(address, index).call()
                              .then((tokenID) => {
                                setTokenIDArray([...tokenID])
                              });
                          }
                        });



  return (

    <div>
      {isLoading ? (
        <div className='spinner-border text-primary' role='status'>                              
          {' '}
          <span className='sr-only'>Loading...</span>
          {' '}
        </div> ) : (  tokenIDArray.map((tokenID) => { return (<p>tokenID</p>); }) )
      }
    </div>
    
  )


}

class BadgeSearch extends Component {

  state = { listOn: 0, web3: null, accounts: null, goldStars: null, redPens: null, searchSent: false,
            goldStarsAddress: null, sendTo: undefined, reason: undefined, balanceResult: 0, mintingCost: null};
  
            

  componentDidMount = async () => {
    try {

      this.setState(this.props, this.getLivePrice);
      
      this.updateSearchAddress = this.updateSearchAddress.bind(this);
      
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };


  searchSent = async () => {

    if (this.state.listOn) {
      this.setState({listOn: 0});
    };
    this.setState({listOn: 1, searchSent: true});
    
  };

  searchRecieved = async () => {
    if (this.state.listOn) {
      this.setState({listOn: 0});
    };
    this.setState({listOn: 1, searchSent: false});
    
  };


  toggleList = async () => {
    const {listOn} = this.state;
    const newStatus = (this.state.listOn ? 0 : 1) ;
    this.setState({listOn: newStatus});
  }

  onMintClick(event) {
    event.preventDefault();
  }


  updateSearchAddress(event) {
    event.preventDefault();
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({[name]: value});
  }


  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    
    
    return (
      <div className="BadgeSearch" >
    
    <Container fluid>

            <Row>
              <Col></Col>
              <Col xs={12} s={8} id='Search'>
              <br></br>

              <h5 style={{color: "white"}}> (Works, but still in progress)</h5>

                <div id="searchHeader">
                View a wallets badge history: 
                   </div>
                 <br></br>
                  <br></br>                 
                    </Col>             
                <Col></Col>
                </Row>


            <Row>
                <Col></Col>
                <Col id='Search' xs={12} md={8}>
                    <InputGroup>
                        <FormControl name="searchAddress" value={this.state.searchAddress} onChange={this.updateSearchAddress} placeholder="0x Wallet Address" />
                        {
                          this.props.accounts
                          ?
                            <DropdownButton as={InputGroup.Append} variant="warning" id="dropdown-basic-button" title="Search">                            
                              <Dropdown.Item onClick={this.searchRecieved}>Badges Received</Dropdown.Item>
                              <Dropdown.Item onClick={this.searchSent}>Badges Sent</Dropdown.Item>
                              <Dropdown.Item >(More Coming Soon...)</Dropdown.Item>
                            </DropdownButton>
                          :
                            <DropdownButton as={InputGroup.Append} variant="warning" id="dropdown-basic-button" onClick={() => {window.location.reload()}} title="Connect">                            
                              <Dropdown.Item onClick={() => {window.location.reload()}} >Badges Received</Dropdown.Item>
                              <Dropdown.Item onClick={() => {window.location.reload()}} >Badges Sent</Dropdown.Item>
                              <Dropdown.Item >(More Coming Soon...)</Dropdown.Item>
                            </DropdownButton>


                        }
                    </InputGroup>
                </Col>
                <Col></Col>
            </Row>

          </Container>
        <br></br>
        <br></br>
        


          {this.state.listOn === 1 && (

          <Container id="ResultsBox" className="SearchResultsContainer" fluid>
            <Row id="BadgeSearchResultsRow">
                <Col xs={1}>
                </Col>

                <Col xs={6} md={12} id='ResultsBox'>
                    <div id="searchHeader">
                   Wallet: {this.state.searchAddress}
                    </div>              
                </Col>
                <Col xs={1} style={{display: 'flex',
                                    alignItems: 'right',
                                    justifyContent: 'right',}} >
                    <Button id="closeListButton" variant="warning" onClick={this.toggleList}> close </Button>
                </Col>             
            </Row>
            <Row id="BadgeSearchResultsRow">

                <ListGroup id="listItem" style={{display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                     }}
                            horizontal="lg" >
                    <Col xs={6} lg={2}>
                      <ListGroup.Item id="listItem_color"  variant="success" > Color </ListGroup.Item>
                    </Col>
                    <Col xs={6} lg={5}>
                      <ListGroup.Item id="listItem_reason"  > Reason </ListGroup.Item>
                    </Col >
                    <Col xs={6} lg={3}>
                      <ListGroup.Item id="listItem_gifter" > { this.state.searchSent ? "Reciever" : "Sender"} </ListGroup.Item>
                    </Col>
                    <Col xs={6} lg={2}>
                      <ListGroup.Item id="listItem_empty"  variant="success"> Badge ID </ListGroup.Item>
                    </Col>
                </ListGroup> 
                <div class="d-block d-sm-block d-md-block d-lg-none"> <br /> </div>          

            <SearchResults searchSent={this.state.searchSent} badge={this.state.goldStars} address={this.state.searchAddress} web3={this.state.web3} accounts={this.state.accounts} />
            <SearchResults searchSent={this.state.searchSent} badge={this.state.pinkSlips} address={this.state.searchAddress} web3={this.state.web3} accounts={this.state.accounts} />     
            </Row>
            </Container>
          )}
          
          <Row>
            <Col></Col>
            <Col id='Search' xs={12} lg={8}>
              {this.state.listOn === 0 && (
                <>
                <strong>***</strong><br />
                GoldenStars are non-removable ERC-721s that include a log of each and
              every generous move by a particular wallet.
                
                </>
              )}
            </Col>
            <Col></Col>
          </Row>
           
        
      </div>
    );
  }
}

export default BadgeSearch;
