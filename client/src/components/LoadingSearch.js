import React, {Component} from 'react';
import Spinner from 'react-bootstrap/Spinner';



function LoadingSearch() {


    return (
        
          
        <div className="LoadingSearch" >
            <Spinner animation="border" variant="light" />
            <Spinner animation="border" variant="info" />
            <Spinner animation="border" variant="warning" />
            <Spinner animation="border" variant="danger" />
            <Spinner animation="border" variant="success" />
            <Spinner animation="border" variant="secondary" />
            <Spinner animation="border" variant="primary" />
            <br />
            <span className="loadingText" >Loading</span>
            <Spinner size="sm" animation="grow" variant="dark" />
            <Spinner size="sm" animation="grow" variant="dark" />
            <Spinner size="sm" animation="grow" variant="dark" />
            
            <br />
            
            <Spinner animation="border" variant="light" />
            <Spinner animation="border" variant="info" />
            <Spinner animation="border" variant="warning" />
            <Spinner animation="border" variant="danger" />
            <Spinner animation="border" variant="success" />
            <Spinner animation="border" variant="secondary" />
            <Spinner animation="border" variant="primary" />


        </div>
    
    )
}

export default LoadingSearch;