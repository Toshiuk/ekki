import React from "react";
import LoginForm from "./components/LoginForm";
import api from "../../services/api";
import Loading from '../../components/Loading';
import { Link } from 'react-router-dom';


class Login extends React.Component {
  state = {
    loading: false,
  };


  handleLogin = async (cpf, password) => {
    this.setState({ loading: true });
    console.log(cpf)
    console.log(password)
    await api
      .post("/login", {
        cpf,
        password
      })
      .then(async response => {
        console.log(response)
        await sessionStorage.setItem("token", response.data.token);
        await sessionStorage.setItem("id", response.data.id);
        this.setState({ loading: false });
        window.location.href = '/dashboard/extract';
      })
      .catch(err => alert(err.response.statusText));
    this.setState({ loading: false });
  };

  render() {
    return (
      <section id="login">
        {this.state.loading && (
          <Loading />
        )}
        <div>
          <div className="margin-sides">
            <div className="columns is-centered">
              <div className="column is-6">
                <div className="box has-background-grey-light">
                  < LoginForm handleLogin={this.handleLogin} />
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="columns is-centered">
              <div className="column is-6">
                <div className="has-text-centered has-font-secondary">
                  Don't have account?
                                    <Link className="has-text-primary has-text-weight-bold" to="/signup">
                    {` Create Now!`}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>
    );
  }
}


export default Login;
