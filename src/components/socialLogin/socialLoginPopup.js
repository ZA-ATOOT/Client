import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import * as userActions from 'actions/userActions';
import StaticFunctions from 'staticFunctions/staticFunctions';

import SocialLogin from 'components/socialLogin/socialLogin';
import loaders from 'components/socialLogin/loaders';
import Popup from 'components/popup/popup';
import FinishRegsterMsg from 'components/finishRegsterMsg/finishRegsterMsg';
import UserProfile from 'components/userProfile/userProfile';

import icons from 'elegantFont.css';
import style from './socialLoginPopup.css';

import loader from 'images/loader.gif';

class SocialLoginBtn extends Component {

  static propTypes = {
    showLogin: PropTypes.bool.isRequired,
    showSocialLogin: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      loginStatus: null,
    }
  }

  logoutUser = () => {
    this.props.logoutUser()
    loaders.facebook(document, "", "171334156706202").then((val) => {
      this.props.loginStatus(val);
    })
  }
  /*handleSocialLogin = () => {
    this.props.handleSocialLogin()
  }*/
  handleSocialLogin = (user, err) => {
    if (err) {
      return
    }

    const {signinUser, showSocialLogin} = this.props;

    console.log("handleSocialLogin")

    showSocialLogin(false)
    //save user id to the local storage
    StaticFunctions.setLocalStorage("_ui", user._profile, false, true)
    //send user profile to the Data Base
    signinUser(user._profile)

  }
  render() {
    const {showSocialLogin, logoutUser, user, loginSize, userStatus, showLogin} = this.props;
    if (showLogin) {
      return (
        <Popup closeBtn={ true } onClick={ showSocialLogin.bind(null, false) }>
          <div className={ style.newUserWrapper } dir="rtl">
            <div className={ style.newUser }>
              <UserProfile />
              <div className={style.socialLoginWrapper}>
              <SocialLogin provider="facebook"
                userId={ user.id }
                appId="171334156706202"
                callback={ this.handleSocialLogin }>
                <div className={ style.facebookLogin }>
                  <span className={ `${style.loginIcon} ${icons.social_facebook}` }></span>
                  <span className={ style.loginText }>Login with facebook</span>
                </div>
              </SocialLogin>
              </div>
            </div>
          </div>
        </Popup>
      )
    } else {
      return false
    }
  }
}

const mapStateToProps = (state) => {
  return {
    userStatus: state.userStatus,
    user: state.user
  }
}

export default connect(mapStateToProps, userActions)(SocialLoginBtn)