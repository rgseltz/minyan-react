import React, { useContext } from "react";
import { Link, NavLink } from 'react-router-dom';
import UserContext from "./auth/UserContext";

function Navigation({ logout }) {
    const currentUser = useContext(UserContext);
    function loggedInNav() {
        return (
            <ul className="navbar-nav auto">
                <li className="nav-item mr-4">
                    <NavLink classname="nav-link" to="/events">
                        Scheduled Minyanim
                    </NavLink>
                </li>
                <li className="nav-item mr-4">
                    <NavLink classname="nav-link" to="/events/new">
                        Create New Minyan
                    </NavLink>
                </li>
                <li className="nav-item mr-4">
                    <NavLink classname="nav-link" to="/profile">
                        Profile
                    </NavLink>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/" onClick={logout}>
                        Logout {currentUser.firstName || currentUser.lastName}
                    </Link>
                </li>
            </ul>
        )
    }
    function loggedOutNav() {
        return (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item mr-4">
                    <NavLink classname="nav-link" to="/login">
                        Login
                    </NavLink>
                </li>
                <li className="nav-item mr-4">
                    <NavLink classname="nav-link" to="/signup">
                        Sign Up
                    </NavLink>
                </li>
            </ul>
        )
    }

    return (
        <nav className="Navigation navbar navbar-expand-md">
            <Link className="navbar-brand" to="/">
                Express Minyan
            </Link>
            {currentUser ? loggedInNav() : loggedOutNav}
        </nav>
    );
}

export default Navigation;