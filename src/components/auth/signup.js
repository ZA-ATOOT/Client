import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import * as authActions from 'actions/authActions';

import style from "./auth.css"

class Signup extends Component {
  handleFormSubmit(formProps) {
    // Call action creator to sign up the user!
    this.props.signupUser(formProps);
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
  enderField({input, placeholder, type, meta: {touched, error}}) {
    return (
      <div>
        <div>
          <input {...input} placeholder={ placeholder } type={ type } />
          { touched && error && <span>{ error }</span> }
        </div>
      </div>
    )
  }

  render() {
    const {handleSubmit} = this.props;
    return (
      <div className={ style.formWrapper }>
        <form onSubmit={ handleSubmit(this.handleFormSubmit.bind(this)) } className={ style.form }>
          <fieldset className={ `${style.inputWrapper} ${style.firstName}` }>
          <div className={style.mask}></div>
            <div className={ style.signBoxWrapper }>
              <div className={ style.signImg }></div>
              <div className={ style.inputWrapper }>
                <Field name="firstName" placeholder="First Name" component={ this.enderField } />
                <Field name="lastName" placeholder="Last Name" component={ this.enderField } />
                <Field name="email" placeholder="Email" component={ this.enderField } />
                <Field name="password" placeholder="Password" component={ this.enderField } type="password" />
                <Field name="passwordConfirm" placeholder="Confirm Password" component={ this.enderField } type="password" />
                { this.renderAlert() }
                <input className={ style.submit } type="submit" value="SIGN UP" />
              </div>
            </div>
          </fieldset>
        </form>
      </div>
      );
  }
}

function validate(formProps) {
  const errors = {};

  if (!formProps.email) {
    errors.email = 'Please enter an email';
  }

  if (!formProps.password) {
    errors.password = 'Please enter a password';
  }

  if (!formProps.passwordConfirm) {
    errors.passwordConfirm = 'Please enter a password confirmation';
  }

  if (formProps.password !== formProps.passwordConfirm) {
    errors.passwordConfirm = 'Passwords must match';
  }

  return errors;
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error
  };
}

let signupForm = reduxForm({
  form: 'signup',
  fields: ['email', 'password', 'passwordConfirm'],
  validate
})(Signup);

export default connect(mapStateToProps, authActions)(signupForm)