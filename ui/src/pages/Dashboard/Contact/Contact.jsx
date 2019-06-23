import React, { Component } from 'react';
import api from '../../../services/api'
import Select from 'react-select';
import Alerts from '../components/Alerts'
import './Contact.css';
import Title from '../components/Title'
import io from 'socket.io-client';


class DashbordContact extends Component {

  state = {
    selectedUser: '',
    users: [],
    contacts: []
  };

  registerToSocket = () => {
    const socket = io('http://localhost:3001');

    socket.on('contacts', contactsUser => {
      console.log(contactsUser)
      this.setState({ contacts: contactsUser });
    })
  }

  componentWillMount() {
    this.registerToSocket();

    api
      .get("/dashboard/contact/list")
      .then(response => {
        this.setState({ contacts: response.data });
      })
      .catch(err => alert(err.response.statusText ? err.response.statusText : err.msg));
    api
      .get("/user/list")
      .then(response => {
        const users = response.data.map(user => { return { value: user.id, label: user.name } })
        this.setState({ users: users });
      })
      .catch(err => alert(err.response.statusText ? err.response.statusText : err.msg));
  }

  listExtract = () => (
    <tbody>
      {this.state.contacts.map(contact => (
        <tr key={contact.id}>
          <td className="has-text-centered is-size-5-mobile">{contact.contact.name}</td>
          <td className="has-text-centered is-size-5-mobile">{contact.contact.phone}</td>
          <td className="has-text-centered is-size-5-mobile"><button name="Delete" type="submit" onClick={this.deleteUser} className="button is-danger" value={contact.contactId}>X</button></td>
        </tr>

      ))}
    </tbody>
  );

  addUser = async selectedUser => {
    this.setState({ selectedUser });
    await api
      .post("/dashboard/contact/create", {
        contactId: selectedUser.value
      })
      .then(async response => {
        response.data.success ? Alerts.success(response.data.msg) : Alerts.warning(response.data.msg)
      })
      .catch(err => alert(err.response.data.error ? err.response.data.error : err.msg));
  };

  deleteUser = async event => {
    await api
      .post("/dashboard/contact/destroy", {
        contactId: event.target.value
      })
      .then(async response => {
        response.data.success ? Alerts.success(response.data.msg) : Alerts.warning(response.data.msg)
      })
      .catch(err => alert(err.response.data.error ? err.response.data.error : err.msg));
  }

  render() {
    return (
      <React.Fragment>
        <Title title="Contacts" />
        <Select
          value={this.state.selectedUser}
          className="selectuser"
          onChange={this.addUser}
          options={this.state.users}
        />
        <div className="columns is-centered">

          <div className="column is-two-thirds">
            <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
              <thead>
                <tr>
                  <th className="has-text-centered is-size-5-mobile"><abbr title="Name">Name</abbr></th>
                  <th className="has-text-centered is-size-5-mobile"><abbr title="Phone">Phone</abbr></th>
                  <th className="has-text-centered is-size-5-mobile"><abbr title="Delete">Delete</abbr></th>
                </tr>
              </thead>


              {this.listExtract()}


            </table>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default DashbordContact;