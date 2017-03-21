import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as userActions from 'actions/userActions';
import StaticFunctions from 'staticFunctions/staticFunctions';

import Header from 'common/header/header';
import Product from 'components/product/product';
import ProductDetails from 'components/productDetails/productDetails';
import AddProduct from 'components/addProduct/addProduct';
import Popup from 'components/popup/popup';
import Loader from 'components/loader/loader';

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
  }

  render() {
    const {products} = this.props;
    if (products.length == 0) {
      return (
        <Loader />
      )
    }

    return (
      <div className={ style.main }>
        <div className={ style.productWrapper }>
          { products.map((val, i) => {
              if (val.available) {
                return (
                  <Product key={ i }
                    product={ val }
                    showSocialLogin={ this.showSocialLogin }
                    finishRegster={ this.finishRegster } />
                )
              }
            }) }
        </div>
      </div>
      );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products
  }
}

export default connect(mapStateToProps, userActions)(Home)



