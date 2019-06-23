import React, { Component } from 'react';
import api from '../../../services/api'
import Title from '../components/Title'
import FormValue from '../components/FormValue'
import { Redirect } from 'react-router-dom';
import Loading from '../../../components/Loading';
import Alerts from '../components/Alerts'


class Deposit extends Component {

  state = {
    loading: false,
    redirect: false
  };

  handleDeposit = async (value) => {
    this.setState({ loading: true });
    await api
      .post("/dashboard/deposit", {
        value
      })
      .then(async response => {
        this.setState({ loading: false });
        if (response.data.success) {
          Alerts.success(response.data.msg);
          this.setState({ redirect: true });
        } else {
          Alerts.warning(response.data.msg)
        }
      })
      .catch(err => alert(err.response.data.error));
  };

  render() {
    return (
      <div className="columns is-centered is-mobile">
        {this.state.loading && (
          <Loading />
        )}
        {this.state.redirect &&
          <Redirect to='/dashboard/extract' />
        }
        <div className="column is-two-thirds">
          <Title title="Deposit" />
          <FormValue handleSubmit={this.handleDeposit} submit="Deposit" />
        </div>
      </div>
    );
  }
}

export default Deposit;