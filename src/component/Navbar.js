import React, { Component } from 'react'
import { connect } from 'react-redux'
import {BrowserRouter as Router, NavLink as RRLink} from 'react-router-dom';
import { Navbar, NavbarBrand, Collapse, Nav, NavItem, NavLink, NavbarToggler, NavbarText } from 'reactstrap'

class NavBar extends Component {
   
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          isOpen: false
        };
      }
      toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
      }

    render() {
        return (
                <Navbar color="dark" dark expand="md">
                <NavbarBrand href="/">Would You Rather</NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.isOpen} navbar>
                    <Router>
                        <Nav className="mr-auto" navbar>
                            <NavItem>
                                <NavLink tag={RRLink} to="#">Home</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={RRLink} to="#">New Question</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={RRLink} to="#">Leaderboard</NavLink>
                            </NavItem>
                        </Nav>
                        <Nav className='ml-auto' navbar>
                            <NavbarText className='mx-1'>Hello, Username</NavbarText>
                            <NavItem >
                                <NavLink href="#">Logout</NavLink>
                            </NavItem>
                        </Nav>      
                    </Router>            
                </Collapse>
            </Navbar>
        )
    }
}


export default connect()(NavBar)