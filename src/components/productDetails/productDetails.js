import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as userActions from 'actions/userActions';
import * as productActions from 'actions/productActions';

import Popup from 'components/popup/popup';
import Product from 'components/product/product';

import icons from 'elegantFont.css';
import style from './productDetails.css';
import strawberry from 'images/strawberry.png';

class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  componentWillMount() {
    this.getMoreFromProduct();
  }

  getMoreFromProduct = () => {
    const {searches, product, findProductsFromArrayOfIds} = this.props;
    var categoriesConncat = product.categories.concat(product.otherCategories)
    if (searches) {
      var searchResult = searches.reduce((all, item, index) => {
        categoriesConncat.map((val, i) => {
          if (item._id.indexOf(val) > -1) {
            if (all.length == 0) {
              all.push(item.value.documents)
            } else {
              all.concat(val)
            }

          }
        })
        return all
      }, []);

      findProductsFromArrayOfIds(...searchResult)
    }
  }

  addLikeShare = (productId, type, isOn) => {
    const {product, user, addLikeShare} = this.props;
    addLikeShare(user.id, {
      productId,
      isOn,
      type
    })
  }
  render() {
    const {product, user, productsSearchResult} = this.props;
    var usreLike = user.like.indexOf(product._id) > -1;
    var usreShare = user.share.indexOf(product._id) > -1;
    return (
      <div className={ style.showDetails } dir="rtl">
        <ul className={ style.product }>
          <li className={ style.headerWrapper }>
            <ul className={ style.header }>
              <li className={ style.actionsWrapper }>
                { product.seller.id != user.id ?
                  <ul className={ style.actions }>
                    <li className={ `${style.save} ${style.iconsWrapper}` } title="save">
                      <div className={ style.iconsText }>
                        שמור
                      </div>
                      <div className={ `${icons.icon_cart_alt} ${style.icons}` }></div>
                    </li>
                    <li className={ `${style.like} ${style.iconsWrapper} ${ usreLike ? style.userLike : ""}` } title="like" onClick={ this.addLikeShare.bind(null, product._id, "like", usreLike) }>
                      <div className={ `${style.iconsText}` }>
                        אהבתי
                      </div>
                      <div className={ `${icons.icon_heart_alt} ${style.icons}` }></div>
                    </li>
                    <li className={ `${style.share} ${style.iconsWrapper} ${ usreShare ? style.userLike : ""}` } title="share" onClick={ this.addLikeShare.bind(null, product._id, "share", usreShare) }>
                      <div className={ style.iconsText }>
                        שתף
                      </div>
                      <div className={ `${icons.social_share} ${style.icons}` }></div>
                    </li>
                  </ul>
                  : <ul className={ style.actions }>
                      <li className={ `${style.save} ${style.iconsWrapper}` } title="edit">
                        <div className={ style.iconsText }>
                          ערוך
                        </div>
                        <div className={ `${icons.icon_pencil} ${style.icons}` }></div>
                      </li>
                      <li className={ `${style.save} ${style.iconsWrapper}` } title="remove">
                        <div className={ style.iconsText }>
                          הסר
                        </div>
                        <div className={ `${icons.icon_trash_alt} ${style.icons}` }></div>
                      </li>
                    </ul> }
              </li>
              <li className={ style.seller }>
                <div className={ style.sellerName }>
                  <div className={ style.sellerFirstName }>
                    { product.seller.firstName }
                  </div>
                  <div className={ style.sellerLastName }>
                    { product.seller.lastName }
                  </div>
                </div>
                <div className={ style.sellerImage }>
                  <img src={ product.seller.profilePicURL } width="50" />
                </div>
              </li>
            </ul>
          </li>
          <li className={ style.title }>
            { product.title }
          </li>
          <li className={ style.imageWrapper }>
            <img src={ product.image } />
          </li>
          <li className={ style.description }>
            <div>
              { product.description }
            </div>
          </li>
          <li className={ style.price }>
            { product.price }<img src={ strawberry } width="20" />
          </li>
          <li className={ style.location }>
            { product.city }
          </li>
          { (productsSearchResult.length > 0) &&
            <li>
              <br />
              <hr />
              <br />
              <div>
                עוד מאותו הסוג
              </div>
              { productsSearchResult.map((val, index) => {
                  if (val._id != product._id) {
                    return (
                      <Product key={ index }
                        width="33%"
                        height="300px"
                        product={ val } />
                    )
                  }
                }) }
            </li> }
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    searches: state.searches,
    user: state.user,
    productsSearchResult: state.productsSearchResult
  }
}

var actions = function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({},userActions, productActions), dispatch)
}
export default connect(mapStateToProps, actions)(ProductDetails)