import React, { Component } from 'react';
import api from '../../../services/api'
import Title from '../components/Title'
import Alerts from '../components/Alerts'
import FormValue from '../components/FormValue'
import { Redirect } from 'react-router-dom';
import Loading from '../../../components/Loading';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'

class Withdraw extends Component {

  state = {
    loading: false,
    redirect: false
  };

  useFromLimit = async (value) => {
    const aboveLimit = sessionStorage.getItem('balance') - value

    if (aboveLimit < 0) {
      confirmAlert({
        title: 'Using from limit',
        message: 'Are you sure to do this.',
        buttons: [
          {
            label: 'Yes',
            onClick: () => this.handleWithdraw(value)
          },
          {
            label: 'No',

          }
        ]
      })
    } else {
      this.handleWithdraw(value)
    }
  };

  handleWithdraw = async (value) => {
    this.setState({ loading: true });
    await api
      .post("/dashboard/withdraw", {
        value
      })
      .then(async response => {
        if (response.data.success) {
          Alerts.success(response.data.msg);
          this.setState({ redirect: true });
        } else {
          Alerts.warning(response.data.msg)
        }
        this.setState({ loading: false });
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
          <Title title="Withdraw" />
          <FormValue handleSubmit={this.useFromLimit} submit="Withdraw" />
        </div>
      </div>
    );
  }
}

export default Withdraw;