import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as productActions from 'actions/productActions';
import StaticFunctions from 'staticFunctions/staticFunctions';

import style from './userProfile.css';

class UserProfile extends Component {
  render() {
    const {user, userStatus} = this.props

    var userDetails = user.id ? user : userStatus;
    if (userDetails.id) {
      var profilePicURL = userDetails.profilePicURL || userDetails.picture.data.url;
      console.log(userStatus, user)
      return (
        <div className={ style.userDetails }>
          <div className={ style.userImageBG }>
            <img src={ profilePicURL } width="100%" />
          </div>
          <div className={ style.userContent }>
            <div className={ style.userImage } style={ { backgroundImage: `url(${profilePicURL})` } }>
            </div>
            <div className={ `${style.userName} ${style.userInfo}` }>
              <span>{ userDetails.first_name } { userDetails.last_name }</span>
              <span>{ userDetails.firstName } { userDetails.lastName }</span>
            </div>
            { /*<div className={ `${style.userEmail} ${style.userInfo}` }>
                                { userDetails.email }
                              </div>*/ }
          </div>
        </div>
      )
    } else {
      return false
    }
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
    userStatus: state.userStatus,
  }
}

export default connect(mapStateToProps, productActions)(UserProfile);
