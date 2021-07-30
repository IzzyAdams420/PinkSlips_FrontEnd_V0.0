import React, {Component} from 'react';

import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Image from 'react-bootstrap/Image';

import headerImage from '../rsrc/imgs/ColoredBadgesHeader_w_badge_compressed.png';


function Web3Prompt (props) {

    const connectWallet = props.connectWallet2;

    
        return (
        <div>
            <Jumbotron xs={6} m={12} style={{justifyContent: "center"}}>
                <Container className="aboutBadgesContainer" style={{backgroundColor: "transparent"}}>   
                    <Row>
                    <Col style={{justifyContent: "center"}}>
                        <Row>
                        <Image style={{alignContent: "center", padding: 0}} alt="Header" src={headerImage} />
                        </Row>
                    </Col>
                    </Row>
                </Container>
                </Jumbotron>
            <Button variant="warning" /*onClick={connectWallet}*/ size="lg" >
                <Spinner animation="grow" variant="light" />
                <Spinner animation="grow" variant="info" />
                <Spinner animation="grow" variant="light" />
                <Spinner animation="grow" variant="info" />
                <Spinner animation="grow" variant="light" />
                <Spinner animation="grow" variant="info" />
                <br /><br />
                <div>  
                
                
                    {' Connecting to Wallet... '}
                
                
                </div>

                <br />
                        
                
                <Spinner animation="grow" variant="info" />
                <Spinner animation="grow" variant="light" />
                <Spinner animation="grow" variant="info" />
                <Spinner animation="grow" variant="light" />
                <Spinner animation="grow" variant="info" />
                <Spinner animation="grow" variant="light" />

            </Button>

        </div>
        )
    
}

export default Web3Prompt;