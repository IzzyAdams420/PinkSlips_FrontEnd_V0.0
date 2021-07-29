import getWeb3 from "./getWeb3";
import React, { Component } from "react";


import GoldStars from "../contracts/GoldStars.json";
import RedPens from "../contracts/RedPens.json";

import LoadingSearch from "./LoadingSearch";

import "../css/App.css";
import "../css/styles.css";

import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import ListGroup from 'react-bootstrap/ListGroup'

import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);


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
    await this.searchWallet();
    this.setState({isLoading: false});

    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to Search. Check console for details.`,
      );
      console.error(error);
    }
  };

  searchWallet = async () => {
    let tokenArray;
    let searchSent = this.props.searchSent;
    if (!searchSent) {
      tokenArray = await this.searchRecieved();
    } else if (searchSent) {
      tokenArray = await this.searchSent();
    } else {
      alert(
        `Failed to Search. Check console for details.`,
      );
      console.error("Sent or Recived not specified");
    }
    
    this.setState({tokenArray});
    console.log("set State token Array");
  }

  searchRecieved = async (props) => {

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

    searchSent = async (props) => {

      let address = this.props.address;
      let badge = this.props.badge;
      let _index = 0;
      
      let indexArray = await badge.methods.getBadgesSent(address).call();
      let balance = indexArray.length;

      let _reciever = "";
      let _reason = "";
      let _id = 0;
  
      let tokenArray = [];
  
  
        for (const [idx, idz] of indexArray.entries()) {
  
          console.log("ForOfLoop " + idx + ", " + idz);
  
          _id = indexArray[idx];
          console.log("Set _id: " + _id);
  
          _reciever = await badge.methods.ownerOf(_id).call();
          console.log("Set _reciever: " + _reciever);
  
          _reason = await badge.methods.getBadgeReason(_id).call();
          console.log("Set _reason: " + _reason);
  
          tokenArray[idx] = {id: _id, reciever: _reciever, reason: _reason};
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

      {/*
      <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Reason</StyledTableCell>
                <StyledTableCell align="right">Badge Color</StyledTableCell>
                <StyledTableCell align="right">Sender &nbsp;</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.tokenArray.map((badgeResult) => (
                <StyledTableRow key={badgeResult.id}>
                  <StyledTableCell component="th" scope="row">
                  {badgeResult.reason}
                  </StyledTableCell>
                  <StyledTableCell align="right">{this.state.badgeColor}</StyledTableCell>
                  <StyledTableCell align="right">{badgeResult.gifter.slice(0, 6) + "..." + badgeResult.gifter.slice(38, 42)}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      */}

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
                       
                         <ListGroup.Item id="listItem_gifter" >
                          {
                            this.props.searchSent
                            ?
                            (badgeResult.reciever.slice(0, 6) + "..." + badgeResult.reciever.slice(38, 42))
                              :
                            (badgeResult.gifter.slice(0, 6) + "..." + badgeResult.gifter.slice(38, 42))
                          }
                          </ListGroup.Item>
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
