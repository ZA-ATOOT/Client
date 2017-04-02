import React, { Component } from 'react';
import { connect } from 'react-redux';

import ProductList from 'components/productList/productList';

import style from './home.css';

class Home extends Component {
  render() {
    return (
      <div className={ style.main }>
        <ProductList products={this.props.products} />
      </div>
      );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products
  }
}

export default connect(mapStateToProps, null)(Home)


