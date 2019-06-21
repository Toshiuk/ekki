import React from 'react';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cpf: '',
      password: '',
    };
  }

  render() {
    return (
      <form
        className="columns is-multiline is-mobile"
        onSubmit={(e) => {
          e.preventDefault();
          this.props.handleLogin(this.state.cpf, this.state.password);
        }}
      >
        <h3 className="subtitle is-3 has-margin-l-7 has-text-weight-bold has-text-primary uppercase">
          Login
        </h3>
        <div className="column is-12">
          <div className="field">
            <label htmlFor="cpf" className="label has-text-primary">
              CPF
            </label>
            <p className="control has-icons-left has-icons-right">
              <input
                id="cpf"
                className="input"
                type="text"
                placeholder="CPF"
                value={this.state.cpf}
                onChange={event => this.setState({ cpf: event.target.value })}
              />
            </p>
          </div>
        </div>

        <div className="column is-12">
          <div className="field">
            <label htmlFor="password" className="label has-text-primary">
              Password
            </label>
            <p className="control has-icons-left has-icons-right">
              <input
                id="password"
                className="input"
                type="password"
                placeholder="Password"
                value={this.state.password}
                onChange={event => this.setState({ password: event.target.value })
                }
              />

            </p>
          </div>
        </div>

        <div className="column is-12">
          <button
            className="uppercase has-text-weight-bold button is-primary is-pulled-right"
            type="submit"
          >
            Login
          </button>
        </div>
      </form>
    );
  }
}


export default LoginForm;
