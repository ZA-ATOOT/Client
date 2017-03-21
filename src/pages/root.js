import React, { Component } from 'react';

import Header from 'common/header/header';
import Home from 'pages/home/home';
//import Auth from 'components/auth/auth';

export default class Main extends Component {
  handleSocialLogin = (user, err) => {
    if (err) {
      return
    }
    if (user.isNewUser) {
      this.finishRegster()
      return
    }

    this.showSocialLogin(false)
    //save user id to the local storage
    StaticFunctions.setLocalStorage("_ui", user._profile, false, true)
    //send user profile to the Data Base
    this.props.signinUser(user._profile)

  }

  logoutUser = () => {
    StaticFunctions.deleteLocalStorage("_ui")
    this.props.signoutUser({})
  }
  render() {
    return (
      /*token ?*/
      <div id="root">
        <Header handleSocialLogin={ this.handleSocialLogin } logoutUser={ this.logoutUser } />
        { this.props.children}
      </div> /*: <Auth />*/
      );
  }
}



