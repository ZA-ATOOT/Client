import React, { Component } from 'react';
import { connect } from 'react-redux';

import style from './finishRegsterMsg.css';

class FinishRegsterMsg extends Component {
  render() {
    const { user } = this.props;
    return (
      <div className={ style.newUserWrapper } dir="rtl">
        <div className={ style.newUser }>
          <div className={ style.userDetails }>
            <div className={ style.userImageBG }>
              <img src={ user.profilePicURL } width="100%" />
            </div>
            <div className={ style.userContent }>
              <div className={ style.userImage } style={ { backgroundImage: `url(${user.profilePicURL})` } }>
              </div>
              <div className={ `${style.userName} ${style.userInfo}` }>
                { user.name }
              </div>
              <div className={ `${style.userEmail} ${style.userInfo}` }>
                { user.email }
              </div>
            </div>
          </div>
          <div className={ style.finishRegsterMsg }>
            אנא רענן את הדף וסיים את הרישום כדי להמשיך גלישה באתר
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, null)(FinishRegsterMsg)