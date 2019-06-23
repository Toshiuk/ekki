import React, { Component } from 'react';
import api from '../../../services/api'
import Title from '../components/Title'

class Extract extends Component {

  state = {
    extract: [],
  };

  componentWillMount() {
    api
      .get("/dashboard/extract")
      .then(response => {
        this.setState({ extract: response.data });
      })
      .catch(err => alert(err.response.statusText ? err.response.statusText : err.msg));
  }

  listExtract = () => (
    <tbody>
      {this.state.extract.map(extract => (
        <tr>
          <td className="has-text-centered is-size-7-mobile">{!extract.sender ? "Deposit" : (!extract.receiver ? "Withdraw" : "Transfer")}</td>
          <td className="has-text-centered is-size-7-mobile">{new Date(Date.parse(extract.createdAt)).toLocaleDateString()}</td>
          <td className="has-text-centered is-size-7-mobile">{extract.sender ? extract.sender.name : ""}</td>
          <td className="has-text-centered is-size-7-mobile">{extract.receiver ? extract.receiver.name : ""}</td>
          <td className="has-text-centered is-size-7-mobile">R$ {extract.value.toFixed(2).toString().replace(".", ",")}</td>
        </tr>

      ))}
    </tbody>
  );

  render() {
    return (
      <React.Fragment>
        <Title title="Extract" />
        <div className="columns is-centered">
          <div className="column is-two-thirds">

            <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
              <thead>
                <tr>
                  <th className="has-text-centered is-size-7-mobile"><abbr title="Type">Type</abbr></th>
                  <th className="has-text-centered is-size-7-mobile"><abbr title="Date">Date</abbr></th>
                  <th className="has-text-centered is-size-7-mobile"><abbr title="Sender">Sender</abbr></th>
                  <th className="has-text-centered is-size-7-mobile"><abbr title="Receiver">Receiver</abbr></th>
                  <th className="has-text-centered is-size-7-mobile"><abbr title="Amount">Amount</abbr></th>
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

export default Extract;