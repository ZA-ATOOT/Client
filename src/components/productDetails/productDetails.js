import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import * as userActions from 'actions/userActions';
import * as productActions from 'actions/productActions';

import Popup from 'components/popup/popup';
import Product from 'components/product/product';
import AddProduct from 'components/addProduct/addProduct';

import icons from 'elegantFont.css';
import style from './productDetails.css';
import strawberry from 'images/strawberry.png';

import { MORE_OF_THE_SANE } from 'actions/searchTypes';

class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newProduct: null,
      showEditProduct: false,
    }
  }
  componentWillMount() {
    this.getMoreFromProduct();
  }

  switchProduct = (product) => {
    var popup = document.getElementById("popupWrapper"),
      popupOverly = document.querySelector('[data-popup]'),
      offset = popup.offsetTop,
      scroll = setInterval(() => {
        if (popup.getBoundingClientRect().top >= offset) {
          clearInterval(scroll)
          this.setState({
            newProduct: product
          })
        }

        popupOverly.scrollTop += -10;
      }, 5);

  //this.getMoreFromProduct(product);
  }

  editProduct = () => {
    const { product, setInitialProductValues } = this.props
    setInitialProductValues(product)
    this.setState({showEditProduct: true})
  }

  getMoreFromProduct = (newProduct) => {
    const {searches, product, findProductsFromArrayOfIds} = this.props;
    var productDetails = newProduct || product;
    var categoriesConncat = productDetails.otherCategories ? productDetails.categories.concat(productDetails.otherCategories.split(",")) : productDetails.categories;
    if (searches) {
      var searchResult = searches.reduce((all, item, index) => {

        categoriesConncat.map((val, i) => {
          if (item._id.indexOf(val) > -1) {
            all.push(...item.value.documents)
          }
        })
        return all
      }, []);

      findProductsFromArrayOfIds(searchResult, MORE_OF_THE_SANE)
    }

    Array.prototype.remove = (item) => {
      var index = this.indexOf(item)
      if (index > -1) {
        this.splice(index, 1)
      }
    }
  }

  addLikeShare = (product, type, isOn) => {
    const {user, addLikeShare} = this.props;
    addLikeShare(user.id, product, {
      productId: product._id,
      isOn,
      type
    })
  }

  handleMoreOfTheSame = (product) => {
    const {moreOfTheSame} = this.props;
    var more = moreOfTheSame.reduce((all, item, index) => {
      if (item._id != product._id) {
        var productItem = (
        <Product key={ index }
          width="33%"
          height="300px"
          product={ item }
          disableShowDetails={ true }
          switchProduct={ this.switchProduct } />
        )
        all.push(productItem)
      }
      return all;
    }, [])

    return more.length != 0 ? more : false
  }

  getCategory = (category) => {
    const {searches, closePopup} = this.props;
    if (category) {
      var searchResult = searches.reduce((all, item, index) => {
        if (item._id.indexOf(category) > -1) {
          all.push(...item.value.documents)
        }
        return all
      }, []);
      closePopup()
      this.props.findProductsFromArrayOfIds(searchResult)
    }
  }

  removeProduct = (productId) => {
    const { removeProduct, product } = this.props    
    removeProduct(product._id)
    console.log("המוצר נמחק")
  }

  render() {
    const {product, user, moreOfTheSame} = this.props;

    const { showEditProduct, newProduct } = this.state;
    var productDetails = newProduct || product;
    var usreLike = user.like.indexOf(productDetails._id) > -1;
    var usreShare = user.share.indexOf(productDetails._id) > -1;
    var categoriesConncat = productDetails.otherCategories ? productDetails.categories.concat(productDetails.otherCategories.split(",")) : productDetails.categories;
    var moreOfTheSameItems = this.handleMoreOfTheSame(productDetails);
    
    return (
      <div className={ style.showDetails } dir="rtl">
        {!showEditProduct && <ul className={ style.product }>
          <li className={ style.headerWrapper }>
            <ul className={ style.header }>
              <li className={ style.actionsWrapper }>
                { productDetails.seller.id != user.id ?
                  <ul className={ style.actions }>
                    <li className={ `${style.save} ${style.iconsWrapper}` } title="save">
                      <div className={ style.iconsText }>
                        שמור
                      </div>
                      <div className={ `${icons.icon_cart_alt} ${style.icons}` }></div>
                    </li>
                    <li className={ `${style.like} ${style.iconsWrapper} ${ usreLike ? style.userLike : ""}` } title="like" onClick={ this.addLikeShare.bind(null, productDetails, "like", usreLike) }>
                      <div className={ `${style.iconsText}` }>
                        אהבתי
                      </div>
                      <div className={ `${icons.icon_heart_alt} ${style.icons}` }></div>
                    </li>
                    <li className={ `${style.share} ${style.iconsWrapper} ${ usreShare ? style.userLike : ""}` } title="share" /*onClick={ this.addLikeShare.bind(null, productDetails, "share", usreShare) }*/>
                    <div className={ style.iconsText }>
                      שתף
                    </div>
                    <div className={ `${icons.social_share} ${style.icons}` }></div>
                    </li>
                  </ul>
                  : <ul className={ style.actions }>
                      <li className={ `${style.save} ${style.iconsWrapper}` } onClick={this.editProduct} title="edit">
                        <div className={ style.iconsText }>
                          ערוך
                        </div>
                        <div className={ `${icons.icon_pencil} ${style.icons}` }></div>
                      </li>
                      <li className={ `${style.save} ${style.iconsWrapper}` } title="remove" onClick={this.removeProduct}>
                        <div className={ style.iconsText }>
                          הסר
                        </div>
                        <div className={ `${icons.icon_trash_alt} ${style.icons}` }></div>
                      </li>
                    </ul> }
              </li>
              <li className={ style.actionsWrapper }>
                <ul className={ style.actions }>
                  { categoriesConncat.map((val, index) => {
                      if (val != "") {
                        return (
                          <li key={ index } className={ style.iconsWrapper } title="edit">
                            <Link to={ `search?q=${val}` } className={ style.categoryText } data-name="showResult" onClick={ this.getCategory.bind(null, val) }>
                            { val }
                            </Link>
                          </li>
                        )
                      }
                    }) }
                </ul>
              </li>
              <li className={ style.seller }>
                <div className={ style.sellerName }>
                  <div className={ style.sellerFirstName }>
                    { productDetails.seller.firstName }
                  </div>
                  <div className={ style.sellerLastName }>
                    { productDetails.seller.lastName }
                  </div>
                </div>
                <div className={ style.sellerImage }>
                  <img src={ productDetails.seller.profilePicURL } width="50" />
                </div>
              </li>
            </ul>
          </li>
          <li className={ style.title }>
            { productDetails.title }
          </li>
          <li className={ style.imageWrapper }>
            <img src={ productDetails.image } />
          </li>
          <li className={ style.description }>
            <div>
              { productDetails.description }
            </div>
          </li>
          <li className={ style.price }>
            { productDetails.price }<img src={ strawberry } width="20" />
          </li>
          <li className={ style.location }>
            { productDetails.city }
          </li>
          { moreOfTheSameItems &&
            <li>
              <br />
              <hr />
              <br />
              <div>
                עוד מאותו הסוג
              </div>
              { moreOfTheSameItems }
            </li> }
        </ul>}
        {showEditProduct && <AddProduct title="ערוך" productToEdit={productDetails}/> }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    searches: state.searches,
    user: state.user,
    moreOfTheSame: state.moreOfTheSame,
    deletedProduct: state.deletedProduct
  }
}

var actions = function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, userActions, productActions), dispatch)
}
export default connect(mapStateToProps, actions)(ProductDetails)