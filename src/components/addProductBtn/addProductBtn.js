import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as productActions from 'actions/productActions';
import StaticFunctions from 'staticFunctions/staticFunctions';

import style from './AddProductBtn.css';

class AddProductBtn extends Component {

  render() {
    const { showAddProduct } = this.props
    return (
      <div className={ style.addProduct } onClick={ showAddProduct.bind(null, true) }>
          <div className={ style.cross }></div>
        </div>
    )
  }
}

export default connect(null, productActions)(AddProductBtn);
