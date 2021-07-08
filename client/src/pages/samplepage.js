import React, { Component } from "react";

const SamplePage = (props) => {

   // testProp = props.testProp;
    return (
        <div> <br /> is testProp {">>>"}  {props.testProp}{"<<<"} </div>
    );

};

export default SamplePage;