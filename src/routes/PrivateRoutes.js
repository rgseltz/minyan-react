import React, { useContext } from "react";
import { Route, Redirect } from 'react-router-dom';
import UserContext from "../auth-forms/UserContext";

function PrivateRoutes({ children, exact, path, update }) {
    const { currentUser } = useContext(UserContext);
    if (!currentUser) {
        return (
            <Redirect to='/'></Redirect>
        )
    }
    return (
        <Route exact={exact} path={path} update={update}>
            {children}
        </Route>
    )
}

export default PrivateRoutes;