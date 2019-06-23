import React, { Component } from 'react';
import api from '../../../services/api'
import io from 'socket.io-client';

class DashboardHeader extends Component {

  state = {
    balanceUser: 0.00,
  };

  registerToSocket = () => {
    const socket = io('http://localhost:3001');
    socket.on(`balance${sessionStorage.getItem('id')}`, balanceUser => {
      this.setState({ balanceUser })
      sessionStorage.setItem('balance', balanceUser)
    })
  }

  componentWillMount() {
    this.registerToSocket();
    api
      .get("/dashboard/balance")
      .then(response => {
        this.setState({ balanceUser: response.data.balanceUser })
        sessionStorage.setItem('balance', response.data.balanceUser)
      })
      .catch(err => alert(err.response ? err.response.statusText : err.msg));
  }

  render() {
    return (
      <section className="hero is-primary">
        <span class="tag is-link">Your Id: {sessionStorage.id}</span>
        <div className="hero-body">
          <div className="container has-text-centered">
            <h1 className="title">
              R$ {this.state.balanceUser.toFixed(2).toString().replace(".", ",")}
            </h1>
            <h2 className="subtitle">
              Credit Limit: R$ 500,00
           </h2>
          </div>
        </div>
      </section>

    );
  }
}


export default DashboardHeader;
