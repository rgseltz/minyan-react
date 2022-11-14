import React, { useContext } from "react";
import { Link, NavLink } from 'react-router-dom';
import UserContext from "./data-stores/UserContext";

function Navigation({ logout }) {
    const { currentUser } = useContext(UserContext);
    console.log(currentUser);
    function loggedInNav() {
        return (
            <div className="navbar nav-right">
                <ul className="navbar-nav auto">
                    <li className="nav-item mr-4">
                        <NavLink className="nav-link" to="/events">
                            Scheduled Minyanim
                        </NavLink>
                    </li>
                    <li className="nav-item mr-4">
                        <NavLink className="nav-link" to="/events/new">
                            Create New Minyan
                        </NavLink>
                    </li>
                    <li className="nav-item mr-4">
                        <NavLink className="nav-link" to="/profile">
                            Profile
                        </NavLink>
                    </li>
                    <li className="nav-item mr-auto">
                        <NavLink className="nav-link" to="/" onClick={logout}>
                            Logout {currentUser.firstName || currentUser.lastName}
                        </NavLink>
                    </li>
                </ul>
            </div>
        )
    }
    function loggedOutNav() {
        return (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item mr-4">
                    <NavLink className="nav-link" to="/login">
                        Login
                    </NavLink>
                </li>
                <li className="nav-item mr-4">
                    <NavLink className="nav-link" to="/signup">
                        Sign Up
                    </NavLink>
                </li>
            </ul>
        )
    }

    return (
        <nav className="Navigation navbar navbar-expand-md">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    Express Minyan
                </Link>
                {!currentUser ? loggedOutNav() : loggedInNav()}
            </div>
        </nav>
    );
}

export default Navigation;