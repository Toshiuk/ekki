import React, { Component } from 'react';
import './Main.css';


class Main extends Component {

  state = {
    Main: [],
  };

  render() {
    return (
      <section id="main">
        <h1 className="title">Ekki by Flávio Toshiuk</h1>
        <p className="subtitle">
          Ekki Bank, Challenge held for the 4All test.
  Using Node.js and React.

                </p>
        <div className="level">
          <div className="level-item dropdown is-hoverable">
            <div className="dropdown-trigger">
              <button className="button is-medium" >
                <span>Node.js</span>
              </button>
            </div>
            <div className="dropdown-menu" id="dropdown-node" role="menu">
              <div className="dropdown-content">
                <div className="dropdown-item">
                  <ul>
                    <li>
                      <span className="icon is-small"><i className="fas fa-angle-double-right" aria-hidden="true" /></span>
                      Express
                    </li>
                    <li>
                      <span className="icon is-small"><i className="fas fa-angle-double-right" aria-hidden="true" /></span>
                      Socket.io
                    </li>
                    <li>
                      <span className="icon is-small"><i className="fas fa-angle-double-right" aria-hidden="true" /></span>
                      MVC
                    </li>
                    <li>
                      <span className="icon is-small"><i className="fas fa-angle-double-right" aria-hidden="true" /></span>
                      JWT
                    </li>
                    <li>
                      <span className="icon is-small"><i className="fas fa-angle-double-right" aria-hidden="true" /></span>
                      Passport.js
                    </li>
                    <li>
                      <span className="icon is-small"><i className="fas fa-angle-double-right" aria-hidden="true" /></span>
                      Hash Password
                    </li>
                    <li>
                      <span className="icon is-small"><i className="fas fa-angle-double-right" aria-hidden="true" /></span>
                      ID is UUID
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="level-item dropdown is-hoverable">
            <div className="dropdown-trigger">
              <button className="button is-medium" >
                <span>React</span>
              </button>
            </div>
            <div className="dropdown-menu" id="dropdown-node" role="menu">
              <div className="dropdown-content">
                <div className="dropdown-item">
                  <ul>
                    <li>
                      <span className="icon is-small"><i className="fas fa-angle-double-right" aria-hidden="true" /></span>
                      Axios
                    </li>
                    <li>
                      <span className="icon is-small"><i className="fas fa-angle-double-right" aria-hidden="true" /></span>
                      Socket.io
                    </li>
                    <li>
                      <span className="icon is-small"><i className="fas fa-angle-double-right" aria-hidden="true" /></span>
                      Single Page Aplication
                    </li>
                    <li>
                      <span className="icon is-small"><i className="fas fa-angle-double-right" aria-hidden="true" /></span>
                      Private Dashboard
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="level-item dropdown is-hoverable">
            <div className="dropdown-trigger">
              <button className="button is-medium" >
                <span>Css</span>
              </button>
            </div>
            <div className="dropdown-menu" id="dropdown-node" role="menu">
              <div className="dropdown-content">
                <div className="dropdown-item">
                  <ul>
                    <li>
                      <span className="icon is-small"><i className="fas fa-angle-double-right" aria-hidden="true" /></span>
                      Bulma
                    </li>
                    <li>
                      <span className="icon is-small"><i className="fas fa-angle-double-right" aria-hidden="true" /></span>
                      Font Awesome
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

        </div>

      </section>
    );
  }
}

export default Main;