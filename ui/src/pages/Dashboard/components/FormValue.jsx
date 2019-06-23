import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FormValue extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
    };
  }

  render() {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          this.props.handleSubmit(this.state.value.replace(',', '.'));
        }}
      >
        <div className="field">
          <div className="control">
            <input
              className="input is-large is-primary"
              type="text"
              placeholder="R$ 0,00"
              value={this.state.value}
              onChange={event => this.setState({ value: event.target.value })}
              pattern="[0-9]*[.,]?[0-9]+"
            />
          </div>
        </div>
        <div className="field is-grouped is-grouped-centered">
          <div className="control">
            <button type="submit" className="button is-primary">{this.props.submit}</button>
          </div>
        </div>
      </form>
    );
  }
}

FormValue.propTypes = {
  handleSubmit: PropTypes.func,
};


export default FormValue;
