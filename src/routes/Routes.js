import React from "react";
import { Switch, Route, Redirect } from 'react-router-dom';
import EventList from '../events/EventList';
import EventDetail from '../events/EventDetail'
import LocationList from '../locations/LocationList';
import LocationDetail from '../locations/LocationDetail';
import ProfileForm from '../auth-forms/ProfileForm';
import LoginForm from "../auth-forms/LoginForm";
import RegisterForm from "../auth-forms/RegisterForm";
import PrivateRoutes from './PrivateRoutes';

function Routes({ login, signup, update }) {
    return (
        <Switch>
            <PrivateRoutes path={'/events/:eventId'}><EventDetail /></PrivateRoutes>
            <PrivateRoutes path={'/events'}><EventList /></PrivateRoutes>
            <PrivateRoutes path={'/locations/:locationId'}><LocationDetail /></PrivateRoutes>
            <PrivateRoutes path={'/locations'}><LocationList /></PrivateRoutes>
            <PrivateRoutes path={'/profile-form'}><ProfileForm update={update} /></PrivateRoutes>
            <Route path="/login"><LoginForm login={login} /></Route>
            <Route path="/register"><RegisterForm signup={signup}></RegisterForm></Route>
            <Redirect to='/'></Redirect>
        </Switch>
    )
}

export default Routes;