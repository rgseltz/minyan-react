import React from "react";
import { Switch, Route, Redirect } from 'react-router-dom';
import { EventList, EventDetail } from '../events';
import { LocationList, LocationDetail } from '../locations';
import PrivateRoutes from './PrivateRoutes';

function Routes({ login, signup, update }) {
    return (
        <Switch>
            <PrivateRoutes path={'/events/:eventId'}><EventDetail /></PrivateRoutes>
            <PrivateRoutes path={'/events'}><EventList /></PrivateRoutes>
            <PrivateRoutes path={'/locations/:locationId'}><LocationDetail /></PrivateRoutes>
            <PrivateRoutes path={'/locations'}><LocationList /></PrivateRoutes>
            <PrivateRoutes path={'/profile-form'}><ProfileForm update={update} /></PrivateRoutes>
            <Route path="/login-form"><LoginForm login={login} /></Route>
            <Route path="/register"><RegisterForm signup={signup}></RegisterForm></Route>
            <Redirect to='/'></Redirect>
        </Switch>
    )
}

export default Routes;