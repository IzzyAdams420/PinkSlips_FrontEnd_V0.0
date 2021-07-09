import React from 'react';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink as NavLinkRRD, Link } from "react-router-dom";


const Sidebar = (props) => {
// verifies if routeName is the one active (in browser input)
    const activeRoute = (routeName) => {
        return props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
    };

// creates the links that appear in the left menu / Sidebar
  const createLinks = (routes) => {
    return routes.map((prop, key) => {
      return (
        <Nav.Item key={key}>
          <Nav.Link
            to={prop.layout + prop.path}
            tag={NavLinkRRD}
            
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
    <div className="Sidebar">
        <br />{"Hey!"}
    </div>
);
}

export default Sidebar;