import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as userActions from 'actions/userActions';
import * as productActions from 'actions/productActions';
import StaticFunctions from 'staticFunctions/staticFunctions';

import Header from 'common/header/header';
import AddProductBtn from 'components/addProductBtn/addProductBtn';
import AddProduct from 'components/addProduct/addProduct';
import Popup from 'components/popup/popup';
import NewUser from 'components/newUser/newUser';
import FinishRegsterMsg from 'components/finishRegsterMsg/finishRegsterMsg';
import SocialLoginPopup from 'components/socialLogin/socialLoginPopup';
import Notification from 'components/notification/notification';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddProduct: false,
      showLogin: false,
      productDetails: "",
      showDetails: false,
      finishRegsterMsg: false,
      showNotifications: false
    }
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.products.length != nextProps.products.length) {
      this.setState({
        showAddProduct: false
      })
    }
  }

  showAddProduct = (show) => {
    const {user, setInitialProductValues} = this.props;
    if (!user.id) {
      this.showSocialLogin(true);
      return
    } else if (user.isNewUser) {
      this.finishRegster()
      return
    }
    setInitialProductValues(null)
    this.setState({
      showAddProduct: show,
      finishRegsterMsg: false
    });
  }

  showSocialLogin = (show) => {
    this.setState({
      showLogin: show
    })
  }

  showNotifications = (show) => {
    if (show == "headerNotification") {
      this.setState({
        showNotifications: !this.state.showNotifications
      })
      return
    }
    this.setState({
      showNotifications: show
    })

  }

  finishRegster = () => {
    this.setState({
      finishRegsterMsg: true
    })
  }

  logoutUser = () => {
    StaticFunctions.deleteLocalStorage("_ui")
    this.props.signoutUser({})
  }

  handleSocialLogin = (user, err) => {
    if (err) {
      return
    }
    if (user.isNewUser) {
      this.finishRegster()
      return
    }
    console.log("handleSocialLogin")

    this.showSocialLogin(false)
    //save user id to the local storage
    StaticFunctions.setLocalStorage("_ui", user._profile, false, true)
    //send user profile to the Data Base
    this.props.signinUser(user._profile)

  }

  render() {
    const {user} = this.props;
    const {showAddProduct, finishRegsterMsg, showLogin, showNotifications} = this.state;
    return (
      <div id="container">
        <Header handleSocialLogin={ this.handleSocialLogin }
          showNotifications={ this.showNotifications }
          logoutUser={ this.logoutUser }
          showSocialLogin={ this.showSocialLogin } />
        { React.cloneElement(this.props.children, {
            handleSocialLogin: this.handleSocialLogin
          }, {}) }
        <AddProductBtn showAddProduct={ this.showAddProduct } />
        { showAddProduct &&
          <Popup closeBtn={ true } onClick={ this.showAddProduct.bind(null, false) }>
            <AddProduct title="הוסף מוצר"/>
          </Popup> }
        { user.isNewUser &&
          <Popup closeBtn={ false }>
            <NewUser isNewUser={ this.isNewUser } />
          </Popup> }
        { finishRegsterMsg &&
          <Popup>
            <FinishRegsterMsg />
          </Popup> }
        { showNotifications &&
          <Notification showNotifications={ this.showNotifications } /> }
        <SocialLoginPopup showSocialLogin={ this.showSocialLogin } showLogin={ showLogin } />
      </div>
      );
  }
}


const mapStateToProps = (state) => {
  return {
    user: state.user,
    products: state.products
  }
}
var actions = function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, userActions, productActions), dispatch)
}

export default connect(mapStateToProps, actions)(Main)
