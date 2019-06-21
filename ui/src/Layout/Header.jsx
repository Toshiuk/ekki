import React from 'react';
import { Link } from 'react-router-dom';

import './Header.css';


export default function Header() {
  return (
    <header id="main-header">
      <div className="header-content">
        <Link to="/">
          Ekki Bank
        </Link>
        <div className="columns is-vcentered is-mobile ">
          {sessionStorage.getItem('token') != undefined
            ? (
              <React.Fragment>
                <Link className="column is-half" to="/dashboard">
                  Dashboard
                </Link>
                <Link className="column is-half" to="/dashboard">
                  Logout
                </Link>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Link className="column is-half" to="/login">
                  Login
                </Link>
                <Link className="column is-half" to="/signup">
                  Signup
                </Link>
              </React.Fragment>
            )
          }
        </div>

      </div>
    </header>
  );
}
