import React from 'react';
import { Link } from 'react-router-dom';

import './Header.css';


export default function Header() {
  const handleLogout = (e) => {
    e.preventDefault();
    sessionStorage.clear();
    window.location.href = '/';
  };

  return (


    <header id="main-header">
      <nav className="header-content" role="navigation" aria-label="main navigation">
        <div className="navbar-start">
          <Link className="navbar-item" to="/">
            Ekki Bank
          </Link>
        </div>
        <div className="navbar-end">
          <div className="navbar-item">

            {sessionStorage.getItem('token') != null
              ? (
                <div className="buttons">
                  <Link className="button is-size-7-mobile is-primary" to="/dashboard/extract">
                    Dashboard
                  </Link>
                  <div className="button is-size-7-mobile is-light" onClick={handleLogout}>
                    Logout
                  </div>
                </div>
              ) : (
                <div className="buttons">
                  <Link className="button is-size-7-mobile is-primary" to="/login">
                    Login
                  </Link>
                  <Link className="button is-size-7-mobile is-light" to="/signup">
                    Signup
                  </Link>
                </div>
              )
            }

          </div>
        </div>
      </nav>
    </header>
  );
}
