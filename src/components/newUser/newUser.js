import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as userActions from 'actions/userActions';
import StaticFunctions from 'staticFunctions/staticFunctions';

import AddUserDetails from 'components/addUserDetails/addUserDetails';
import UserProfile from 'components/userProfile/userProfile';

import style from './newUser.css';

import strawberry from 'images/strawberry.png'

class NewUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stepes: 0,
      userParams:""
    }
  }

  nextStep = (params, finish) => {
    const {stepes, userParams} = this.state;

    this.setState({
      stepes: stepes + 1,
      userParams: params
    })

    if (finish) {
      this.props.updateUser(this.props.user.id, userParams)
    }
  }

  render() {
    const {user, isNewUser} = this.props
    const {stepes} = this.state;
    return (
      <div className={ style.newUserWrapper } dir="rtl">
        <div className={ style.newUser }>
          <UserProfile />
          { stepes == 0 &&
            <div className={ style.newUserGreeting }>
              <div className={ style.greeting }>
                ברוך הבא <span dir="rtl">{ user.name }</span> לאתר זאטוט אנא המשך לשלב הבא כדי לסיים את תהליך ההרשמה
              </div>
              <input type="button"
                className={ style.nextStep }
                value="שלב הבא"
                onClick={ this.nextStep } />
            </div> }
          { stepes == 1 &&
            <div className={ style.newUserDetails }>
              <AddUserDetails isNewUser={ isNewUser } nextStep={this.nextStep} />
            </div> }
          { (stepes == 2) &&
            <div className={ style.newUserFinsh }>
              <div className={ style.present }>
                בשל הצטרפותך לאתר קיבלת <span className={ style.presentAmount }>20</span><img src={ strawberry } width="20" />(תותים)
              </div>
              <input type="button"
                className={ style.nextStep }
                value="סיום"
                onClick={ this.nextStep.bind(null, "", true) } />
            </div> }
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

export default connect(mapStateToProps, userActions)(NewUser)

/*
<div className={style.newUserWrapper} dir="rtl">
<div className={style.newUserGreeting}>
        <div className={style.userImage}>
          <img src={user.profilePicURL} width="100" />
        </div>
        <div className={style.greeting}>
          ברוך הבא <span dir="rtl">{user.name}</span> לאתר זאטוט
        </div>
        <div className={style.present}>
          בשל הצטרפותך לאתר קיבלת <span className={style.presentAmount}>20</span><img src={strawberry} width="20"/>(תותים) 
        </div>
        </div>
      </div>
*/


/*<div className={ style.present }>
  בשל הצטרפותך לאתר קיבלת <span className={ style.presentAmount }>20</span><img src={ strawberry } width="20" />(תותים)
</div>*/