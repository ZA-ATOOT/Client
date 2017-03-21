import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as productActions from 'actions/productActions';
import StaticFunctions from 'staticFunctions/staticFunctions';

import style from './popup.css';

class Popup extends Component {
  closePopup = (e) => {
    this.props.onClick()
  }
  overlayClosePopup = (e) => {
     if(e.target.dataset.popup == "overlayWrapper"){
      this.props.onClick()
     }
  }

  componentWillMount() {
    StaticFunctions.disableScroll()
  }

  componentWillUnmount() {
    StaticFunctions.enableScroll()
  }

  render() {
    const { closeBtn } = this.props
    return (
      <div className={style.overlayWrapper} onClick={this.overlayClosePopup} data-popup="overlayWrapper">
        <div className={ style.popupWrapper } >
          {closeBtn && <div className={ style.closePopup } onClick={ this.closePopup }>
            <div className={ style.cross }></div>
          </div> }
          { this.props.children }
        </div>
      </div>
    )
  }
}

export default connect(null, productActions)(Popup);
