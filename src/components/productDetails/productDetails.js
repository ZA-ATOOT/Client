import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as userActions from 'actions/userActions';

import Popup from 'components/popup/popup';

import icons from 'elegantFont.css';
import style from './productDetails.css';
import strawberry from 'images/strawberry.png';

class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  addLikeToProduct = () => {
    const {product, user} = this.props;
    this.props.updateUserArray(user.id, {
      like: product._id
    })
  }
  render() {
    const {product, user} = this.props;
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
                    <li className={ `${style.like} ${style.iconsWrapper}` }
                      title="like"
                      onClick={ this.addLikeToProduct }>
                      <div className={ `${style.iconsText}` }>
                        אהבתי
                      </div>
                      <div className={ `${icons.icon_heart_alt} ${style.icons} ${(user.like.indexOf(product._id) > -1) ? style.userLike : ""}` }></div>
                    </li>
                    <li className={ `${style.share} ${style.iconsWrapper}` } title="share">
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
            { product.location }
          </li>
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, userActions)(ProductDetails)