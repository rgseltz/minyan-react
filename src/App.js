import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import UserContext from './auth/UserContext'
import MinyanApi from './api'
import { Link } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <UserContext>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </div>
      </UserContext>
    </BrowserRouter>
  );
}

export default App;
