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
import Homepage from "../Homepage";
import NewLocationForm from "../locations/NewLocationForm";
import NewEventForm from "../events/NewEventForm";

function Routes({ login, signup, update }) {
    return (
        <Switch>
            <PrivateRoutes exact path={'/events/:eventId'}><EventDetail /></PrivateRoutes>
            <PrivateRoutes exact path={'/events/new'}><NewEventForm /></PrivateRoutes>
            <PrivateRoutes exact path={'/events'}><EventList /></PrivateRoutes>
            <PrivateRoutes exact path={'/locations/:locationId'}><LocationDetail /></PrivateRoutes>
            <PrivateRoutes exact path={'/locations/new'}><NewLocationForm /></PrivateRoutes>
            <PrivateRoutes path={'/locations'}><LocationList /></PrivateRoutes>
            <PrivateRoutes path={'/profile-form'}><ProfileForm update={update} /></PrivateRoutes>
            <Route exact path={'/login'}><LoginForm login={login} /></Route>
            <Route exact path={'/signup'}><RegisterForm signup={signup}></RegisterForm></Route>
            <Route path={'/'}><Homepage /></Route>
            {/* <Redirect to='/' /> */}
        </Switch>
    )
}

export default Routes;