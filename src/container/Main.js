import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as userActions from 'actions/userActions';
import StaticFunctions from 'staticFunctions/staticFunctions';

import Header from 'common/header/header';
import AddProductBtn from 'components/addProductBtn/addProductBtn';
import AddProduct from 'components/addProduct/addProduct';
import Popup from 'components/popup/popup';
import NewUser from 'components/newUser/newUser';
import FinishRegsterMsg from 'components/finishRegsterMsg/finishRegsterMsg';
import SocialLoginBtn from 'components/socialLogin/socialLoginBtn';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddProduct: false,
      showLogin: false,
      productDetails: "",
      showDetails: false,
      finishRegsterMsg: false
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
    const {user} = this.props;
    if (!user.id) {
      this.showSocialLogin(true);
      return
    } else if (user.isNewUser) {
      this.finishRegster()
      return
    }
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

    this.showSocialLogin(false)
    //save user id to the local storage
    StaticFunctions.setLocalStorage("_ui", user._profile, false, true)
    //send user profile to the Data Base
    this.props.signinUser(user._profile)

  }

  render() {
    const {user} = this.props;
    const {showAddProduct, finishRegsterMsg, showLogin} = this.state;
    return (
      <div id="container">
        <Header handleSocialLogin={ this.handleSocialLogin } logoutUser={ this.logoutUser } />
        { this.props.children }
        <AddProductBtn showAddProduct={ this.showAddProduct } />
        { showAddProduct &&
          <Popup closeBtn={ true } onClick={ this.showAddProduct.bind(null, false) }>
            <AddProduct />
          </Popup> }
        { user.isNewUser &&
          <Popup closeBtn={ false }>
            <NewUser isNewUser={ this.isNewUser } />
          </Popup> }
        { finishRegsterMsg &&
          <Popup>
            <FinishRegsterMsg />
          </Popup> }
        { showLogin &&
          <Popup closeBtn={ true } onClick={ this.showSocialLogin.bind(null, false) }>
            <SocialLoginBtn handleSocialLogin={ this.handleSocialLogin } loginSize="large" />
          </Popup> }
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

export default connect(mapStateToProps, userActions)(Main)
