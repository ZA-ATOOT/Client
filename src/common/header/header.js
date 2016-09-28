import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import style from './header.css'

class Header extends Component {
  render() {
    return (
      <nav className={ style.navbar }>
        <Link to="/" className={ style.navbarBrand }>ZA-ATOOT APP</Link>
        <ul className={ style.nav }>
          <li className={ style.navItem }>
            <Link className={ style.navLink } to="/signout">Sign Out</Link>&nbsp;
            <Link className={ style.navLink } to="/home">Home</Link>&nbsp;
            <Link className={ style.navLink } to="/newProdact">New Prodact</Link>
          </li>
        </ul>
      </nav>
      );
  }
}

export default Header;
