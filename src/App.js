import React, { useState, useEffect } from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import UserContext from './data-stores/UserContext';
import EventContext from './data-stores/EventContext';
import LocationContext from './data-stores/LocationContext';
import MinyanApi from './api'
import Navigation from './Navigation';
import Homepage from './Homepage';
import Routes from './routes/Routes';
import { Link } from 'react-router-dom';
import jwt from 'jsonwebtoken';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage('');
  const [events, setEvents] = useState([]);
  const [locations, setLocations] = useState([]);
  console.log('events', events);
  console.log('locations', locations);
  /** On application mount, get current user if logged in(w/ token),
   *  fetch locations and existing events to be stored in Context 
   */
  useEffect(
    () => {
      async function getCurrentUser() {
        if (token) {
          try {
            MinyanApi.token = token;
            let { username } = jwt.decode(token);
            console.log(username);
            let currentUser = await MinyanApi.getCurrentUser(username);
            console.log('current user', currentUser);
            setCurrentUser(currentUser);
          } catch (err) {
            console.error('Problem loading user', err);
          }
        }
      }
      getCurrentUser();
      getLocations();
      getEvents();
    }, [token]
  );

  /** Functions for fetching location and data information on application
   * mount
   */
  async function getLocations(filter = {}) {
    try {
      let locations = await MinyanApi.getLocations();
      setLocations(() => locations);
    } catch (err) {
      console.error('Problem fetching locations', err);
    }
  }

  async function getEvents(filter = {}) {
    try {
      let events = await MinyanApi.getEvents();
      setEvents(() => events);
      console.log(events);
    } catch (err) {
      console.error('Problem fetching events', err);
    }
  }

  /** Function for creating new events - MinyanApi ajax POST */
  async function createEvent(formData) {
    try {
      console.log(formData);
      const newEvent = await MinyanApi.createEvent(formData);
      console.log('newEvent response', newEvent); /**BUG!!! Request is sent correctly DB is updated, 
                                but response data is returned UNDEFINED*/
      await getEvents();
      // console.log('events', events)
    } catch (err) {
      console.error('Error creating event', err);
      return { success: false };
    }
  }

  /** Function for attending an event */
  async function attend(eventId) {
    try {
      const attendEvent = await MinyanApi.attend(eventId);
      console.log('attend response', attendEvent.currentCapacity);
      setEvents(events.map(
        event => {
          event.currentCapacity = attendEvent.currentCapacity
          return event;
        }
      ));
    } catch (err) {
      console.error('Error joining event', err)
      return { success: false };
    }
  }

  /** Function for creating new locations */
  async function createLocation(formData) {
    try {
      let newLocation = await MinyanApi.createLocation(formData);
    } catch (err) {
      console.error('Error creating location', err);
      return { success: false };
    }
  }

  /** Handles full application logout */
  function logout() {
    setCurrentUser(null);
    setToken(null);
  }

  /** Handles full application signup */
  async function signup(signupFormData) {
    try {
      await MinyanApi.signup(signupFormData);
      setToken(token);
      return { success: true };
    } catch (err) {
      console.error('Signup failed', err);
      return { success: false };
    }
  }

  /** Handles full application login */
  async function login(loginFormData) {
    try {
      const token = await MinyanApi.login(loginFormData);
      setToken(token);
      return { success: true }
    } catch (err) {
      console.error('Login failed', err);
      return { success: false };
    }
  }

  /** Updates user profile info*/
  async function update(proileFromData, username) {
    try {
      username = currentUser.username;
      await MinyanApi.update(proileFromData, username);
    } catch (err) {
      console.error('Update failed', err);
      return { success: false };
    }
  }
  return (
    <BrowserRouter>
      <UserContext.Provider value={{ currentUser, setCurrentUser }}>
        <LocationContext.Provider value={{ locations, setLocations, createLocation }}>
          <EventContext.Provider value={{ events, setEvents, createEvent, attend }}>
            <Navigation logout={logout} />
            <Routes login={login} signup={signup} update={update} />
            <div className="App">
              {/* {!currentUser ? <Homepage /> : null} */}
            </div>
          </EventContext.Provider>
        </LocationContext.Provider>
      </UserContext.Provider>
    </BrowserRouter >
  );
}

export default App;
