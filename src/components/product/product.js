import React, { Component } from 'react';
import { connect } from 'react-redux';

import Popup from 'components/popup/popup';
import ProductDetails from 'components/productDetails/productDetails';
import SocialLoginPopup from 'components/socialLogin/socialLoginPopup';

import icons from 'elegantFont.css';
import style from './product.css';

import strawberry from 'images/strawberry.png';

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lagreImg: "",
      showImg: false,
      showAddProduct: false,
      showDetails: false,
      showLogin: false
    }
  }
  showSocialLogin = (show) => {
    this.setState({
      showLogin: show
    })
  }

  showDetails = (show) => {
    const {user, showSocialLogin, finishRegster, disableShowDetails, product, switchProduct} = this.props
    if (disableShowDetails) {
      if (switchProduct) {
        switchProduct(product)
      }
      return
    }
    
    if (!user.id) {
      this.showSocialLogin(true);
    } else if (user.isNewUser) {
      finishRegster();
    } else {
      this.setState({
        showDetails: show
      })
    }


  }
  render() {
    const {product, user, width, height} = this.props;
    const {lagreImg, showImg, showDetails, showLogin} = this.state;
    var isUserProduct = product.seller.id == user.id;
    return (
      <div className={ style.productContent } style={ { width: width, height: height } }>
        <div className={ `${style.product} ${isUserProduct ? style.userProduct : ""}` } dir="rtl" onClick={ this.showDetails.bind(null, true) }>
          <div className={ style.description }>
            <div className={ style.titleWrapper }>
              <div>
                { product.title }
              </div>
              { user.like && (user.like.indexOf(product._id) > -1) && <div className={ `${icons.icon_heart} ${style.icons}` }></div> }
            </div>
            <hr />
            <div>
              { product.description }
            </div>
          </div>
          <div className={ style.img } style={ { backgroundImage: `url(${product.image}` } }></div>
          <div className={ style.details }>
            <div className={ style.price }>
              { product.price }<img src={ strawberry } width="20" />
            </div>
            <div>
              { product.city }
            </div>
          </div>
        </div>
        { showDetails &&
          <Popup closeBtn={ true } onClick={ this.showDetails.bind(null, false) }>
            <ProductDetails product={ product } />
          </Popup> }
        <SocialLoginPopup showSocialLogin={ this.showSocialLogin } showLogin={ showLogin } />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, null)(Product)