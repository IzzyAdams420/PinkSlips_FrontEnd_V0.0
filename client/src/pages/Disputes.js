import React, { Component } from "react";
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

//import Button from 'react-bootstrap/Button';



import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import 'bootstrap/dist/css/bootstrap.min.css';
import "../css/App.css";
import "../css/styles.css";

import redPenIcons from '../icons/redPenIcon.png';
import headerImage from '../rsrc/imgs/Chad_Banner.png';

export default function Disputes(props) {
  return (
    <div className="App" style={{color: "white", alignContent: "center", marginTop: "20vh", justifyContent: "center"}}>       
      <h3 style={{marginTop: "-10%"}} >Community Managed Disputes <br /> (coming soon)</h3>
      <br /><br />
      <Container>
        <Row>
          <Col xs={0} md={2}>
          </Col>

          <Col xs={12} md={8}>
            <Card className="FaucetInterface" style={{}}>
              <CardContent>
                <Typography variant="h5" component="h2">
                Appeal Your Badge
                </Typography>
                <Typography color="textSecondary">
                {"0 of 0 appeals granted"}
                </Typography>

                <br />
                
                <Container>
                    <Row>
                      <Col xs={1} md={3}>
                      </Col>

                      <Col xs={10} md={6}>
                        <Card className="FaucetIcon" style={{backgroundColor: "pink" }}>
                          <CardContent>
                          <Typography variant="h5" component="h2">
                            <br />
                          {"Summon the Jury"}
                          <span style={{ textAlign: "center", position: "relative", top: "70px", fontSize: "820%"}}> {"👩‍⚖️"} </span>
                            </Typography>
                            </CardContent>
                        </Card>
                      </Col>

                      <Col xs={1} md={3}>
                      </Col>
                    </Row>
                  </Container>
                
              </CardContent>
              <CardActions style={{justifyContent: "center"}}>
                <Button color="secondary" size="small"><strong>Submit Appeal <br /> (Coming Soon)</strong></Button>
              </CardActions>
            </Card>
          </Col>

          <Col xs={0} md={2}>
          </Col>
        </Row>
      </Container>
      <br /><br />
      
      



    </div>
  )
}
