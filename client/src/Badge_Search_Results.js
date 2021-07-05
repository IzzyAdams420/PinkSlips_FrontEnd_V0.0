import getWeb3 from "./getWeb3";
import React, { Component } from "react";


import GoldStars from "./contracts/GoldStars.json";
import RedPens from "./contracts/RedPens.json";

import LoadingSearch from "./LoadingSearch";

import redPenIcons from './icons/redPenIcon.png';

import "./App.css";
import "./styles.css";

import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import ListGroup from 'react-bootstrap/ListGroup'

import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';




class SearchResults extends Component {
  state = {isLoading: true, tokenArray: null};


  componentDidMount = async () => {
    try {
    
    let badge = this.props.badge;

    let badgeColor = await badge.methods.badgeColor().call();
    let listVariant = "";

    if (badgeColor[0] === "G") {
      listVariant = "warning";
    } else if (badgeColor[0] === "P") {
      listVariant = "danger";
    } else {
      listVariant = "outline-success";
    }

    this.setState({listVariant});

    this.setState({badgeColor});
    await this.searchSetUp();
    this.setState({isLoading: false});

    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to Search. Check console for details.`,
      );
      console.error(error);
    }
  };

  searchSetUp = async () => {
    let tokenArray = await this.searchFromProps();
    this.setState({tokenArray});
    console.log("set State token Array");
  }

  searchFromProps = async (props) => {

    let address = this.props.address;
    let badge = this.props.badge;
    let _index = 0;
    let balance = parseInt(await badge.methods.balanceOf(address).call());
    
    let tokenArray = [];
                                                                                        
    let _gifter = "";
    let _reason = "";
    let _id = 0;

    let indexArray = [];
    


      for (let i = 0; i < balance; i++) {
        indexArray[i] = i;
      }


      for (const [idx, idz] of indexArray.entries()) {

        console.log("ForOfLoop " + idx + ", " + idz);

        _id = await badge.methods.tokenOfOwnerByIndex(address, idx).call();
        console.log("Set _id: " + _id);

        _gifter = await badge.methods.getBadgeSender(_id).call();
        console.log("Set _gifter: " + _gifter);

        _reason = await badge.methods.getBadgeReason(_id).call();
        console.log("Set _reason: " + _reason);

        tokenArray[idx] = {id: _id, gifter: _gifter, reason: _reason};
      }

      return tokenArray;

      console.log("returned token Array");

        // .then(() => { })


    }

    burn = async (badgeTokenId) => {
      const badge = this.props.badge;
      const accounts = this.props.accounts;
      await badge.methods.revokeBadge(badgeTokenId).send({from: accounts[0]});
}



  render() {
    if (this.state.isLoading) {
      return <LoadingSearch />;
    }
    return (
      <div className="SearchResults">

        { this.state.tokenArray.map(badgeResult => (
             
             <>
               
                 <ListGroup id="listItem" style={{display: 'flex',
                                     alignItems: 'center',
                                     justifyContent: 'center',
                                      }}
                             horizontal="lg" >
                     <Col xs={6} lg={2}>
                       <ListGroup.Item id="listItem_color"  variant={this.state.listVariant} > {this.state.badgeColor} </ListGroup.Item>
                     </Col>
                     <Col xs={6} lg={5}>
                       <ListGroup.Item id="listItem_reason"  > {badgeResult.reason} </ListGroup.Item>
                     </Col >
                     <Col xs={6} lg={3}>
                       <ListGroup.Item id="listItem_gifter" > {badgeResult.gifter.slice(0, 6) + "..." + badgeResult.gifter.slice(38, 42)} </ListGroup.Item>
                     </Col>
                     <Col xs={6} lg={2}>
                       <ListGroup.Item id="listItem_empty" variant="warning">{badgeResult.id}</ListGroup.Item>
                     </Col>
                 </ListGroup> 
                 <div class="d-block d-sm-block d-md-block d-lg-none"> <br /> </div>          
                 
             </>
               
               ))}


      </div>
    );
  }
  };

export default SearchResults;
