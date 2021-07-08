import React, {Component} from 'react';

import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';



function Web3Prompt (props) {

    const connectWallet = props.connectWallet;

    
        return (
        <div>
            <Button variant="warning" onClick={() => {connectWallet()}} size="lg" >
                <Spinner animation="grow" variant="light" />
                <Spinner animation="grow" variant="info" />
                <Spinner animation="grow" variant="light" />
                <Spinner animation="grow" variant="info" />
                <Spinner animation="grow" variant="light" />
                <Spinner animation="grow" variant="info" />
                <br /><br />
                <div>  
                
                
                    {' Connect Wallet '}
                
                
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