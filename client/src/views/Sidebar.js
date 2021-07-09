import React from 'react';
import {Container} from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { useLocation, Route, Switch, Redirect } from "react-router-dom";

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink as NavLinkRRD, Link } from "react-router-dom";
import { PropTypes } from "prop-types";

import Image from 'react-bootstrap/Image';

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
            <Nav.Item key={key}>
            <Nav.Link
                href={prop.layout + prop.path}
                tag={NavLinkRRD}
                onClick={toggleDrawer}
                activeClassName="active"
            >
                <i className={prop.icon} />
                {prop.name}
            </Nav.Link>
            </Nav.Item>
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
    style={{marginLeft: "20px"}}
    
    >

        
          <Navbar.Brand className="pt-0" style={{marginLeft: "-20px"}} {...navbarBrandProps}>
            <img
              alt={logo.imgAlt}
              className="navbar-brand-img"
              src={coloredLogoSmall}
            />
          </Navbar.Brand>


          <Nav navbar>{createLinks(routes)}</Nav>
          
          
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