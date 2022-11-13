import React, { useState, useEffect } from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import UserContext from './auth-forms/UserContext'
import MinyanApi from './api'
import Navigation from './Navigation';
import Routes from './routes/Routes';
import { Link } from 'react-router-dom';
import jwt from 'jsonwebtoken';

function App() {
  const [currentUser, setCurrentUser] = useState('testuser');
  // const [token, setToken] = useLocalStorage('token');
  const [token, setToken] = useState(MinyanApi.token);
  console.log('token', token);
  console.log('currentUser', currentUser);

  // useEffect(
  //   async function getCurrentUser() {
  //     if (token) {
  //       try {
  //         MinyanApi.token = token;
  //         let { username } = jwt.decode(token);
  //         console.log(username);
  //         let currentUser = await MinyanApi.getCurrentUser(username);
  //         console.log(currentUser);
  //         setCurrentUser(currentUser);
  //       } catch (err) {
  //         console.error('Problem loading user', err);
  //         setCurrentUser(null);
  //       }
  //     }
  //     getCurrentUser();
  //   }, [token]
  // );

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
      await MinyanApi.login(loginFormData);
      setToken(token);
      return { success: true }
    } catch (err) {
      console.errog('Login failed', err);
      return { success: false };
    }
  }

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ currentUser, setCurrentUser }}>
        <Navigation logout={logout} />
        <Routes login={login} signup={signup} update={update} />
        <div className="App">
          <h1>Welcome to Minyan Maker Express!</h1>
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
