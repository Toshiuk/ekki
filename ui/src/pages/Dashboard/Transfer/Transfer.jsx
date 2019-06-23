import React, { Component } from 'react';
import Select from 'react-select';
import api from '../../../services/api';
import FormValue from '../components/FormValue'
import { Redirect } from 'react-router-dom';
import Loading from '../../../components/Loading'
import Title from '../components/Title'
import { confirmAlert } from 'react-confirm-alert';
import Alerts from '../../../components/Alerts'


class Transfer extends Component {


  state = {
    contacts: [],
    selectedContact: ""
  };

  componentWillMount() {
    api
      .get("/dashboard/contact/list")
      .then(response => {
        const contacts = response.data.map(contact => { return { value: contact.contactId, label: contact.contact.name } })
        this.setState({ contacts });
      })
      .catch(err => Alerts.warning(err.msg));
  }

  useFromLimit = async (value) => {
    const aboveLimit = sessionStorage.getItem('balance') - value

    if (aboveLimit < 0) {
      confirmAlert({
        title: 'Using from limit',
        message: 'Are you sure to do this.',
        buttons: [
          {
            label: 'Yes',
            onClick: () => this.handleTransfer(value)
          },
          {
            label: 'No',

          }
        ]
      })
    } else {
      this.handleTransfer(value)
    }
  };

  handleChange = async selectedContact => {
    this.setState({ selectedContact });
    console.log(this.state.selectedContact)
  }

  handleTransfer = async (value) => {
    this.setState({ loading: true });

    await api
      .post("/dashboard/transfer", {
        value,
        receiverId: this.state.selectedContact.value
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
      <React.Fragment>
        {this.state.loading && (
          <Loading />
        )}
        {this.state.redirect &&
          <Redirect to='/dashboard/extract' />
        }
        <div className="columns is-centered is-mobile">
          <div className="column is-two-thirds">
            <Title title="Transfer" />
            <Select
              value={this.state.selectedContact}
              className="selectuser"
              onChange={this.handleChange}
              options={this.state.contacts}
            />
            <FormValue handleSubmit={this.useFromLimit} submit="Transfer" />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Transfer;
