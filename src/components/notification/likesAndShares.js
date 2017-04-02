import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as productActions from 'actions/productActions';


import loaders from 'components/socialLogin/loaders';

import style from './likesAndShares.css';

import { USER_LIKES_AND_SHARES } from "actions/userTypes";

class LikesAndShares extends Component {
  constructor(props) {
    super(props);
    
    this.state = {

    }
  }

  render() {
    const {userLikesAndShares, user, findProductsFromArrayOfIds} = this.props;

    if (!userLikesAndShares.getFromServer) {
      findProductsFromArrayOfIds(user.like, USER_LIKES_AND_SHARES, true)
      return (
        <img src={ loaders } width="100" />
      )
    }

    if (userLikesAndShares.products.length > -1) {
      return (
        <div className={ style.likesAndSharesWrapper } dir="ltr">
          { userLikesAndShares.products.map((val, index) => {
              return (
                <div key={ index } className={ style.productWrapper }>
                  <ul className={ style.product }>
                    <li className={ style.seller }>
                      <div className={ style.sellerImage }>
                        <img src={ val.seller.profilePicURL } width="50" />
                      </div>
                      <div className={ style.sellerName }>
                        <div className={ style.sellerLastName }>
                          { val.seller.lastName }
                        </div>
                        <div className={ style.sellerFirstName }>
                          { val.seller.firstName }
                        </div>
                      </div>
                    </li>
                    <li className={ style.title }>
                      { val.title }
                    </li>
                    <li className={ style.imageWrapper }>
                      <img src={ val.image } width="60" />
                    </li>
                  </ul>
                </div>
              )
            }) }
        </div>
      )
    } else {
      return false
    }


  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    userLikesAndShares: state.userLikesAndShares
  }
}

export default connect(mapStateToProps, productActions)(LikesAndShares)