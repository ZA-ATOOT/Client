import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import * as authActions from 'actions/authActions';

import style from "./auth.css"

import passwordImg from "images/images2.png"
import userNameImg from "images/userName2.png"

class Signin extends Component {
  handleFormSubmit({email, password}) {
    // Need to do something to log user in
    this.props.signinUser({
      email,
      password
    });
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong>
          { this.props.errorMessage }
        </div>
        );
    }
  }

  render() {
    const {handleSubmit} = this.props;
    return (
      <div className={ style.formWrapper }>
        <form className={ style.form } onSubmit={ handleSubmit(this.handleFormSubmit.bind(this)) }>
          <fieldset>
            <div className={ style.signBoxWrapper }>
              <div className={ style.signImg }></div>
              <div className={ style.inputWrapper }>
                <Field name="email" placeholder="Email" component="input" />
                <Field name="password" placeholder="Password" component="input" type="password" />
                { this.renderAlert() }
                <input className={ style.submit } type="submit" value="LOG IN" />
              </div>
            </div>
          </fieldset>
        </form>
      </div>
      );
  }
}


const mapStateToProps = (state) => {
  return {
    errorMessage: state.auth.error
  };
}

let signinForm = reduxForm({
  form: 'signin',
  fields: ['email', 'password']
})(Signin);

export default connect(mapStateToProps, authActions)(signinForm)
