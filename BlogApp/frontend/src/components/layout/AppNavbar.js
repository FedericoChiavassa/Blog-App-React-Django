import React, { Component, Fragment } from 'react';
import { NavLink as RRNavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Container
} from 'reactstrap';
import Logout from '../auth/Logout';

class AppNavbar extends Component {
    state = {
        isOpen: false
    };

    toggle = () => {
        this.setState({
          isOpen: !this.state.isOpen
        });
    }

    render() {
        const { isAuthenticated, user } = this.props.auth;

        const authLinks = (
            <Fragment>
                <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                    <span className="navbar-text">
                        <strong>{ user ? `Welcome ${user.name}` : '' }</strong>
                    </span>
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem tag={RRNavLink} to="/dashboard">
                    Dashboard
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    <Logout />
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Fragment>
        );

        const guestLinks = (
            <Fragment>
                <NavItem>
                    <NavLink tag={RRNavLink} to="/register">Register</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={RRNavLink} to="/login">Login</NavLink>
                </NavItem>  
            </Fragment>
        );
        return (
            <div>
                <Navbar color="dark" dark expand="sm" className="mb-5">
                    <Container>
                        <NavbarBrand tag={RRNavLink} to="/">BlogApp</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen}  navbar>
                            <Nav className="mr-auto" navbar>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/posts">Posts</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/about">About</NavLink>
                                </NavItem>
                            </Nav>
                            <Nav className="ml-auto" navbar>
                                { isAuthenticated ? authLinks : guestLinks }
                            </Nav>
                        </Collapse>
                    </Container>     
                </Navbar>
            </div>
        );
    }
}

AppNavbar.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, null)(AppNavbar);