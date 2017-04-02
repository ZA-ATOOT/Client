import React, { Component } from 'react';
import { connect } from 'react-redux';
import VisibilitySensor from 'react-visibility-sensor';

import * as productActions from 'actions/productActions';

import Loader from 'components/loader/loader';
import Product from 'components/product/product';

import loader from 'images/loader.gif';

import style from './productList.css';

class ProductList extends Component {
  constructor(props) {
    super(props);

    this.pageNumber = [];
    this.alreadyShown = [0];
    this.state = {
      finishRegsterMsg: false,
      skipBy: 20,
      isVisible: 0
    }
  }
  onChange = (index, isVisible) => {
    const {skipBy} = this.state;
    const {products, getAllProducts} = this.props;
    var productsLength = products.length

    if (isVisible) {
      this.setState({
        isVisible: index
      })
    }
    if (this.refs[`pageNumber${index}`] && isVisible && productsLength == index + 1 && this.alreadyShown.indexOf(index) < 0) {
      getAllProducts(index + 1, skipBy)
      this.alreadyShown.push(index)
    }
  }

  goToPage = (pageNumber) => {
    var elem = this.refs[`pageNumber${pageNumber}`];
    var elemOffset = elem.offsetTop;
    var direction = elemOffset > window.pageYOffset ? 5 : -5;
    var viewport = window.innerHeight + window.pageYOffset;
    if (elemOffset > window.pageYOffset && elemOffset < viewport) {
      return
    }

    var timerID = setInterval(() => {
      if (direction < 0) {
        if (window.pageYOffset == 0 || window.pageYOffset <= elemOffset - 100) {
          clearInterval(timerID);
        }
      } else {
        var clientHeight = document.documentElement.clientHeight;
        var windowFullHeight = window.innerHeight + window.pageYOffset;
        if (window.pageYOffset >= elemOffset - 100 || clientHeight == windowFullHeight) {
          clearInterval(timerID);
        }
      }
      window.scrollBy(0, direction);
    }, 1);

  }
  render() {
    const {products} = this.props;
    const {pageNumber, skipBy, isVisible} = this.state;
    if (products.length == 0) {
      return (
        <Loader />
      )
    }
    var itemindex = []
    return (
      <div>
        <div className={ style.productWrapper }>
          { products.map((val, index) => {
              if (val.available) {
                if ((index + 1) % skipBy == 0 || index == 0) {
                  if (this.pageNumber.indexOf(index) < 0 && isVisible == index) {
                    this.pageNumber.push(index)
                  }
                  return (
                    <VisibilitySensor key={ index }
                      partialVisibility={ true }
                      scrollCheck={ true }
                      scrollDelay={ 100 }
                      intervalCheck={ false }
                      onChange={ this.onChange.bind(null, index) }>
                      <div style={ { width: "20%" } } ref={ `pageNumber${index}` }>
                        <Product key={ index }
                          product={ val }
                          showSocialLogin={ this.showSocialLogin }
                          finishRegster={ this.finishRegster } />
                      </div>
                    </VisibilitySensor>
                  )
                }
                return (
                  <div style={ { width: "20%" } } key={ index }>
                    <Product key={ index }
                      product={ val }
                      showSocialLogin={ this.showSocialLogin }
                      finishRegster={ this.finishRegster } />
                  </div>
                )
            
              }
            }) }
        </div>
        <div className={ style.pageNumber }>
          { this.pageNumber.map((val, index) => {
              return (
                <div key={ index } className={ `${style.pageNumberIndex} ${isVisible == val ? style.isVisible : ""}` } onClick={ this.goToPage.bind(null, val) }>
                  { index + 1 }
                </div>
              )
            }) }
        </div>
      </div>
    )
  }
}


export default connect(null, productActions)(ProductList)

