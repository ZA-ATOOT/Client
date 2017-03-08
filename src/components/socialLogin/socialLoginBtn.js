import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as userActions from 'actions/userActions';

import SocialLogin from 'components/socialLogin/socialLogin';
import loaders from 'components/socialLogin/loaders';

import icons from 'elegantFont.css';
import style from './socialLoginBtn.css';

import loader from 'images/loader.gif';

class SocialLoginBtn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loginStatus: null
    }

    if (!this.props.user.id) {
      loaders.facebook(document, "", "171334156706202").then((val) => {
        this.props.loginStatus(val);
      })
    }
  }
  handleLoginStatus = (userStatus) => {

    if (userStatus.status) {
      return (
        <span className={ style.loginText }>Login with facebook</span>
      )
    }
    if (userStatus.id) {
      return (
        <span className={ style.loginAs }><span>{ `Login as ${userStatus.first_name}` }</span> <img src={ userStatus.picture.data.url } className={ style.fbLoginImage } /></span>
      )
    }
    if (!userStatus.id) {
      return (
        <img src={ loader } width="20" />
      )
    }
  }
  render() {
    const {handleSocialLogin, logoutUser, user, loginSize, userStatus} = this.props;
    if (user.id) {
      return (
        <div className={ `${style.facebookLogin} ${style.smallLogin}` } onClick={ logoutUser }>
          <span className={ `${style.loginIcon} ${icons.social_facebook}` }></span>
          <span className={ style.loginAs }><span>Logout</span> <img src={ user.profilePicURL } className={ style.fbLoginImage } /></span>
        </div>
      )
    }
    return (
      <SocialLogin provider="facebook"
        appId="171334156706202"
        callback={ handleSocialLogin }>
        <div className={ `${style.facebookLogin} ${loginSize == "small" ? style.smallLogin : ""}` }>
          <span className={ `${style.loginIcon} ${icons.social_facebook}` }></span>
          { this.handleLoginStatus(this.props.userStatus) }
        </div>
      </SocialLogin>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userStatus: state.userStatus,
    user: state.user
  }
}

export default connect(mapStateToProps, userActions)(SocialLoginBtn)