import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as userActions from 'actions/userActions';
import StaticFunctions from 'staticFunctions/staticFunctions';

import SocialLogin from 'components/socialLogin/socialLogin';
import SocialLoginBtn from 'components/socialLogin/socialLoginBtn';
import Header from 'common/header/header';
import Product from 'components/product/product';
import ProductDetails from 'components/productDetails/productDetails';
import AddProduct from 'components/addProduct/addProduct';
import Popup from 'components/popup/popup';
import NewUser from 'components/newUser/newUser';
import FinishRegsterMsg from 'components/finishRegsterMsg/finishRegsterMsg'

import loader from 'images/loader.gif';
import icons from 'elegantFont.css';

import styleD from './home.css';
import styleM from './homeM.css';

var style = StaticFunctions.mobilecheck() ? styleM : styleD

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddProduct: false,
      showLogin: false,
      productDetails: "",
      showDetails: false,
      finishRegsterMsg: false
    //user: StaticFunctions.getLocalStorage("_ui", false, true)
    }
    var ui = StaticFunctions.getLocalStorage("_ui", false, true)
    if (ui) {
      this.props.signinUser(StaticFunctions.getLocalStorage("_ui", false, true))
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.products.length != nextProps.products.length) {
      this.setState({
        showAddProduct: false
      })
    }
  }

  showSocialLogin = (show) => {
    this.setState({
      showLogin: show
    })
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

  finishRegster = () => {
    this.setState({finishRegsterMsg: true})
  }


  handleSocialLogin = (user, err) => {
    if (err) {
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
    const {img, showImg, showAddProduct, showLogin, showDetails, finishRegsterMsg} = this.state;
    const {products, user} = this.props;

    if (products.length < 0) {
      return (
        <img src={ loader } />
      )
    }

    return (
      <div className={ style.main }>
        <Header handleSocialLogin={ this.handleSocialLogin } logoutUser={ this.logoutUser } />
        { showAddProduct &&
          <Popup closeBtn={ true } onClick={ this.showAddProduct.bind(null, false) }>
            <AddProduct />
          </Popup> }
        <div className={ style.productWrapper }>
          { products.map((val, i) => {
              if (val.available) {
                return (
                  <Product key={ i } product={ val } showSocialLogin={ this.showSocialLogin } finishRegster={this.finishRegster}/>
                )
              }
            }) }
          { showImg ? imagePopup : "" }
        </div>
        <div className={ style.addProduct } onClick={ this.showAddProduct.bind(null, true) }>
          <div className={ style.cross }></div>
        </div>
        { showLogin &&
          <Popup closeBtn={ true } onClick={ this.showSocialLogin.bind(null, false) }>
            <div className={ style.socialLoginWrapper }>
              <div>
                You Must Login to see Product Details
              </div>
              <SocialLoginBtn handleSocialLogin={ this.handleSocialLogin }
                loginSize="large"
                loginStatus={ this.loginStatus }
                user={ user } />
            </div>
          </Popup> }
        { user.isNewUser &&
          <Popup closeBtn={ false }>
            <NewUser isNewUser={ this.isNewUser } />
          </Popup> }
        { finishRegsterMsg && 
          <Popup>
            <FinishRegsterMsg />
          </Popup> }
      </div>
      );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products,
    user: state.user,
    isNew: state.user.isNew
  }
}

export default connect(mapStateToProps, userActions)(Home)



