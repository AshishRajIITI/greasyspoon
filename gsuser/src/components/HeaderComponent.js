import React, { Component, useState } from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Button } from 'reactstrap';
import { NavLink, Link } from 'react-router-dom';
import LoginModal from './LoginModal';


function HeaderComponent(props) {
    const [gsnavbar, setNavbar] = useState(false);
    const [isNavOpen, toggleNavbar] = useState(false);

    const changeNavBg =()=>{
        if(window.scrollY >= 70)
        {
            setNavbar(true);
        }else {
            setNavbar(false);
        }
    }
    window.addEventListener('scroll', changeNavBg);
    return (
        <React.Fragment>
            <div >
            <Navbar fixed="top" expand="lg" className={gsnavbar ? 'navbar-light gs-nav-active' : 'navbar-dark'} >
                <div className="container">
                    <NavbarBrand href="/">
                        <span className="g">GREASY</span><span className={gsnavbar ? "s-active": "s"}>SPOON</span>
                    </NavbarBrand>
                    <NavbarToggler className="ml-auto" onClick={() => toggleNavbar(!isNavOpen)} />
                    <Collapse isOpen={isNavOpen} navbar>
                        <Nav navbar className="ml-auto">
                            <NavItem>
                                <NavLink className="nav-link" to="/home">
                                    Home
                            </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to="/aboutus">
                                    About Us
                            </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to="/menu">
                                    Menu
                            </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to="/order">
                                    Orders
                            </NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                    {
                        props.auth.isAuthenticated
                            ?
                            <NavbarBrand disabled className="btn-profile">
                                
                                    <span className="fa fa-user fa-lg"></span> {props.auth.user ? props.auth.user.name : null}
                            
                            </NavbarBrand>
                            :
                            null
                    }
                    <LoginModal auth={props.auth} loginGoogleUser={props.loginGoogleUser} logoutUser={props.logoutUser} />

                </div>

            </Navbar>
            </div>
        </React.Fragment>
    );
}

export default HeaderComponent;