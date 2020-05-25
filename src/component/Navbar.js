import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
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

      logout = () => {
          const {dispatch} = this.props
          dispatch(setAuthedUser(null))
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
                            <NavbarText className='mx-2 text-info'>Hello, {this.props.user.name}</NavbarText>
                            <NavItem >
                                <NavLink className='btn btn-warning text-dark px-2' onClick={this.logout}>Logout</NavLink>
                            </NavItem>
                        </Nav>      
                    </Router>            
                </Collapse>
            </Navbar>
        )
    }
}

function mapStateToProps({authedUser, users}){
    return{
        user: users[authedUser]
    }
}

export default connect(mapStateToProps)(NavBar)