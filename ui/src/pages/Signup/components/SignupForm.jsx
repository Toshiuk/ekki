import React from 'react';

class SignupForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      cpf: '',
      phone: '',
      password: '',
    };
  }

  render() {
    return (
      <form
        className="columns is-multiline is-mobile"
        onSubmit={(e) => {
          e.preventDefault();
          this.props.handleSignup(this.state.name, this.state.cpf, this.state.phone, this.state.password);
        }}
      >
        <h3 className="subtitle is-3 has-margin-l-7 has-text-weight-bold has-text-primary uppercase">
          Signup
        </h3>
        <div className="column is-12">
          <div className="field">
            <label htmlFor="name" className="label has-text-primary">
              Name
            </label>
            <p className="control has-icons-left has-icons-right">
              <input
                id="name"
                className="input"
                type="text"
                placeholder="Name"
                value={this.state.name}
                onChange={event => this.setState({ name: event.target.value })}
              />
            </p>
          </div>
        </div>
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
            <label htmlFor="phone" className="label has-text-primary">
              Phone
            </label>
            <p className="control has-icons-left has-icons-right">
              <input
                id="phone"
                className="input"
                type="text"
                placeholder="Phone"
                value={this.state.phone}
                onChange={event => this.setState({ phone: event.target.value })}
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
            Signup
          </button>
        </div>
      </form>
    );
  }
}


export default SignupForm;
