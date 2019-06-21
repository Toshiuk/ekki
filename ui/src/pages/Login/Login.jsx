import React from "react";
import LoginForm from "./components/LoginForm";
import api from "../../services/api";
import Loading from '../../components/Loading';
import { Link, Redirect } from 'react-router-dom';


class Login extends React.Component {
    state = {
        loading: false,
        redirect: false
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
                await sessionStorage.setItem("token", response.data.token);
                this.setState({ loading: false, redirect: true });
            })
            .catch(err => alert(err.response.statusText));
        this.setState({ loading: false });
    };

    render() {
        return (
            <React.Fragment>
                {this.state.loading && (
                    <Loading />
                )}

                {this.state.redirect &&
                    <Redirect to='/dashboard' />
                }

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

            </React.Fragment>
        );
    }
}


export default Login;
