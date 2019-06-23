import React from "react";
import SignupForm from "./components/SignupForm";
import api from "../../services/api";
import { Link, Redirect } from 'react-router-dom';

import Loading from '../../components/Loading';

class Signup extends React.Component {
  state = {
    loading: false,
    redirect: false,
  };


  handleSignup = async (name, cpf, phone, password) => {
    this.setState({ loading: true });
    await api
      .post("/signup", {
        name,
        cpf,
        phone,
        password
      })
      .then(async response => {
        alert(response.statusText);
        this.setState({ loading: false, redirect: true });
      })
      .catch(err => alert(err.response.data.error));
    this.setState({ loading: false });
  };

  render() {
    return (
      <section id="signup">
        {this.state.loading && (
          <Loading />
        )}

        {this.state.redirect &&
          <Redirect to='/login' />
        }

        <div className="margin-sides">
          <div>
            <div className="columns is-centered">
              <div className="column is-6">
                <div className="box has-background-grey-light">
                  < SignupForm handleSignup={this.handleSignup} />
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="columns is-centered">
              <div className="column is-6">
                <div className="has-text-centered has-font-secondary">
                  Already have account?
                                    <Link className="has-text-primary has-text-weight-bold" to="/login">
                    {` Login Now!`}
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


export default Signup;
