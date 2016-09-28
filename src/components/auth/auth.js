import React, { Component } from 'react';

import Signin from './signin';
import Signup from './signup';

import style from "./auth.css"

export default class AuthActions extends Component {

  render() {
    return (
      <div>
        <div className={ style.bg }></div>
        <div className={ style.signWrapper }>        
            <h1>WELCOME TO ZA-ATOOT</h1>
          <div className={ style.signContent }>
            <div className={ `${style.signinWrapper} ${style.sign}` }>
              <Signin />
            </div>
            <div className={ style.orWrapper }>
              <div className={ style.or }>OR</div>
            </div>
            <div className={ `${style.signupWrapper} ${style.sign}` }>
              <Signup />
            </div>
          </div>
        </div>
      </div>
      );
  }
}

