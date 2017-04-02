import React, { Component } from 'react';
import { connect } from 'react-redux';

import ProductList from 'components/productList/productList';

import style from './search.css';

class Search extends Component {

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
    products: state.productsSearchResult
  }
}

export default connect(mapStateToProps, null)(Search)



