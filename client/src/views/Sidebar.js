import React from 'react';
import {Container} from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { useLocation, Route, Switch, Redirect } from "react-router-dom";

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import { NavLink as NavLinkRRD, Link } from "react-router-dom";
import { PropTypes } from "prop-types";

import Image from 'react-bootstrap/Image';

import GitHubIcon from '@material-ui/icons/GitHub';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';

import coloredLogo from '../rsrc/imgs/ColoredBadgesHeader_w_badge_compressed.png';
import coloredLogoSmall from '../rsrc/imgs/ColoredLogo.png';

const Sidebar = (props) => {

    const toggleDrawer = props.toggleDrawer;
// verifies if routeName is the one active (in browser input)
    const activeRoute = (routeName) => {
        return props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
    };


    const historyRedirect = (newPath) => {
        const routerHistory = this.useHistory();
        routerHistory.push(newPath);
    
        return <></>;

    }

// creates the links that appear in the left menu / Sidebar
    const createLinks = (routes) => {  
        return routes.map((prop, key) => {

        const newPath = prop.layout + prop.path;
        
        return (
            <>
                    <Nav.Item key={key}>
                        <Nav.Link
                            as={Link} // without this, routing wasnt working
                            to={ prop.layout + prop.path}
                            tag={NavLinkRRD}
                            onClick={toggleDrawer}
                            activeClassName="active"
                        >
                            <prop.icon style={{marginLeft: "10px", marginRight:"7px"}}/>
                           {prop.name} 
                        </Nav.Link>              
                    </Nav.Item>
                <Dropdown.Divider />
            </>
            
        );
        });
    };

  const { bgColor, routes, logo } = props;
  let navbarBrandProps;
  if (logo && logo.innerLink) {
    navbarBrandProps = {
      to: logo.innerLink,
      tag: Link,
    };
  } else if (logo && logo.outterLink) {
    navbarBrandProps = {
      href: logo.outterLink,
      target: "_blank",
    };
  }


  return (

    <Navbar
    className="navbar-vertical fixed-left navbar-light bg-pink"
    expand="xs"
    id="sidenav-main"
    style={{minHeight: "97vh"}}
    
    >

        
          <Navbar.Brand style={{position: "absolute", top: 0}} className="pt-0" {...navbarBrandProps}>
            <img
              alt={logo.imgAlt}
              className="navbar-brand-img"
              src={coloredLogoSmall}
            />
          </Navbar.Brand>

          
            <Nav style={{position: "absolute", top: 150, textAlign: "left"}} navbar>
                
                    {createLinks(routes)}
                
            </Nav>

            <Nav style={{position: "absolute", textAlign: "left"}}
                style={window.innerHeight >= 710 ? {position: "fixed", bottom: 0} : {position: "absolute", top: 520}} navbar>                
              <Nav.Item key={"Docs"}>
                 <Nav.Link
                            href="https://docs.pinkslips.fun"
                            tag={NavLinkRRD}
                            activeClassName="active"
                        >
                            <MenuBookIcon style={{marginLeft: "10px", marginRight:"7px"}}/>
                           Docs 
                  </Nav.Link>              
              </Nav.Item>
              <Dropdown.Divider />
              <Nav.Item key={"Github"}>
                 <Nav.Link
                             // without this, routing wasnt working
                            href="https://github.com/IzzyAdams420/PinkSlips_Front_End"
                            tag={NavLinkRRD}
                            activeClassName="active"
                        >
                            <GitHubIcon style={{marginLeft: "10px", marginRight:"7px"}}/>
                           Github 
                  </Nav.Link>              
              </Nav.Item>
              <Dropdown.Divider />
              <Nav.Item key={"Discord"}>
                 <Nav.Link
                            href="https://discord.gg/JMXK4GNe"
                            tag={NavLinkRRD}
                            activeClassName="active"
                        >
                            <ChatBubbleOutlineIcon style={{marginLeft: "10px", marginRight:"7px"}}/>
                           Discord 
                  </Nav.Link>              
              </Nav.Item>
              <Dropdown.Divider />
                
            </Nav>
          
          
    </Navbar>
);
};

Sidebar.defaultProps = {
    routes: [{}],
  };
  
  Sidebar.propTypes = {
    // links that will be displayed inside the component
    routes: PropTypes.arrayOf(PropTypes.object),
    logo: PropTypes.shape({
      // innerLink is for links that will direct the user within the app
      // it will be rendered as <Link to="...">...</Link> tag
      innerLink: PropTypes.string,
      // outterLink is for links that will direct the user outside the app
      // it will be rendered as simple <a href="...">...</a> tag
      outterLink: PropTypes.string,
      // the image src of the logo
      imgSrc: PropTypes.string.isRequired,
      // the alt for the img
      imgAlt: PropTypes.string.isRequired,
    }),
  };

export default Sidebar;