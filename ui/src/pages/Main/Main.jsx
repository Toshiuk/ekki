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
                    <li>> Express</li>
                    <li>> Socket.io</li>
                    <li>> MVC</li>
                    <li>> JWT</li>
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
                    <li>> Axios</li>
                    <li>> Socket.io</li>
                    <li>> MVC</li>
                    <li>> Single Page Aplication</li>
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
                    <li>> Bulma</li>
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