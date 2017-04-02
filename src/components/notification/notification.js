import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as productActions from 'actions/productActions';

import LikesAndShares from './likesAndShares'

import style from './notification.css';

import { USER_LIKES_AND_SHARES } from "actions/userTypes";

class Notification extends Component {
  constructor(props) {
    super(props);

    this.pageYOffset = window.pageYOffset
    this.preventClose = false;
    this.state = {
      section: 1
    }
  }

  componentWillMount() {
    document.body.addEventListener('click', this.bodyClicked)
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this.bodyClicked)
  }

  preventScroll = (e) => {
    if (e == "onMouseEnter") {
      this.pageYOffset = window.pageYOffset
      window.addEventListener('scroll', this.scroll)
    } else {
      window.removeEventListener('scroll', this.scroll)
    }
  }

  scroll = (e) => {
    window.scroll(0, this.pageYOffset)
  }
  preventCloseOnEnter = (e) => {
    if (e == "onMouseEnter") {
      this.preventClose = true;
    } else {
      this.preventClose = false
    }
  }

  bodyClicked = (e) => {
  	if(e.target.dataset && e.target.dataset.id == "headerNotification"){
  		this.preventClose = true
  	}
    if (!this.preventClose) {
      this.props.showNotifications(false)
    }
  }

  changeSection = (section) => {
    this.setState({
      section: section
    })
  }

  render() {
    const {section} = this.state
    return (
      <div dir="rtl"
        className={ style.notification }
        data-id="notification"
        onMouseEnter={ this.preventCloseOnEnter.bind(null, "onMouseEnter") }
        onMouseLeave={ this.preventCloseOnEnter.bind(null, "onMouseLeave") }>
        <div className={ style.secionHeadrs }>
          <ul className={ `${style.navbar} ${style[`section${section}`]}` }>
            <li className={ `${style.nav} ${style.section1}` } onClick={ this.changeSection.bind(null, 1) }>
              בקשות רכישה
            </li>
            <li className={ style.separator }></li>
            <li className={ `${style.nav} ${style.section2}` } onClick={ this.changeSection.bind(null, 2) }>
              מוצרים שאהבת
            </li>
            <li className={ style.separator }></li>
            <li className={ `${style.nav} ${style.section3}` } onClick={ this.changeSection.bind(null, 3) }>
              מוצרים חדשים
            </li>
          </ul>
        </div>
        { section == 2 &&
          <div className={ style.sectionWrapper }
            dir="ltr"
            onMouseEnter={ this.preventScroll.bind(null, "onMouseEnter") }
            onMouseLeave={ this.preventScroll.bind(null, "onMouseLeave") }>
            <LikesAndShares />
          </div> }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    userLikesAndShares: state.userLikesAndShares
  }
}

export default connect(mapStateToProps, productActions)(Notification)