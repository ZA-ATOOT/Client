import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, li } from 'react-router';

import * as productActions from 'actions/productActions';

import SocialLoginBtn from 'components/socialLogin/socialLoginBtn';
import StaticFunctions from 'staticFunctions/staticFunctions';

import Popup from 'components/popup/popup';
import loaders from 'components/socialLogin/loaders';
import SearchProduct from 'components/searchProduct/searchProduct';

import style from './header.css';
import icons from 'elegantFont.css';
import zaatootLogo from 'images/zaatootLogo.jpg';
import facebookLogo from 'images/facebook.png';

class Header extends Component {
  render() {
    const {user, logoutUser, handleSocialLogin} = this.props
    return (
      <nav className={ style.navbar }>
        <ul className={ style.nav }>
          <li to="/" className={ style.navbarBrand }>
            <img width="32" src={ zaatootLogo } />
          </li>
          <li>
            <SocialLoginBtn handleSocialLogin={ handleSocialLogin }
              loginSize="small"
              logoutUser={ logoutUser } />
          </li>
          <li className={ style.navItem }>
            <Link className={ `${style.navLi} ${style.headerBtn}` } to="/"> Home
            </Link>
          </li>
          <li className={ `${style.navItem} ${style.search}` }>            
            <SearchProduct  />
          </li>
          <li className={ style.navItem }>
            <span className={ icons.icon_menu_square_alt }></span>
          </li>
          <li className={ `${style.navItem} ${style.profile}` }>
            <span className={ style.circle }></span>
            <span className={ style.halfCircle }></span>
          </li>
          <li className={ style.navItem }>
            <span className={ icons.icon_comment }></span>
            <span className={ style.notification }>1</span>
          </li>
        </ul>
      </nav>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    searches: state.searches
  };
}

export default connect(mapStateToProps, productActions)(Header)