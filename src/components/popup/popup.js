import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from 'actions/actionCreators';
import StaticFunctions from 'staticFunctions/staticFunctions';

import style from './popup.css';

class Popup extends Component {
  onClick = () => {
    this.props.onClick()
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
      <div className={style.overlayWrapper}>
        <div className={ style.popupWrapper }>
          {closeBtn && <div className={ style.closePopup } onClick={ this.onClick }>
            <div className={ style.cross }></div>
          </div> }
          { this.props.children }
        </div>
      </div>
    )
  }
}

export default connect(null, actions)(Popup);
