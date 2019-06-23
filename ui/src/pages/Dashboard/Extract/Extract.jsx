import React, { Component } from 'react';
import api from '../../../services/api'
import Title from '../components/Title'
import Alerts from '../../../components/Alerts'
import './Extract.css'
import Pagination from "react-js-pagination";
import io from 'socket.io-client';
class Extract extends Component {

  state = {
    extract: [],
    activePage: 1,
    offset: 0,
    countRows: 1,
  };

  getExtract = async () => {
    await api
      .get("/dashboard/extract", {
        params: {
          offset: this.state.offset,
          limit: 15,
        }
      })
      .then(response => {

        this.setState({ extract: response.data.rows, countRows: response.data.count });
        console.log(response.data.rows)
      })
      .catch(err => Alerts.warning(err.msg));
  }


  componentWillMount() {
    this.getExtract();
  }


  handlePageChange = async (pageNumber) => {
    const offset = (pageNumber - 1) * 10
    await this.setState({ activePage: pageNumber, offset });
    this.getExtract();
  }

  listExtract = () => (
    <tbody>
      {this.state.extract.map(extract => (
        <tr className={extract.positive ? "positive-row" : "negative-row"}>
          <td className="has-text-centered is-size-7-mobile">{extract.type}</td>
          <td className="has-text-centered is-size-7-mobile">{new Date(Date.parse(extract.createdAt)).toLocaleDateString()}</td>
          <td className="has-text-centered is-size-7-mobile">{extract.sender ? extract.sender.name : "-"}</td>
          <td className="has-text-centered is-size-7-mobile">{extract.receiver ? extract.receiver.name : "-"}</td>
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

            <table className="table is-bordered is-narrow is-hoverable is-fullwidth">
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
            <Pagination
              activePage={this.state.activePage}
              itemsCountPerPage={15}
              totalItemsCount={this.state.countRows}
              pageRangeDisplayed={5}
              onChange={this.handlePageChange}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Extract;