/**
  Action Creators

  These fire events which the reducer will handle
  We will later call these functions from inside our component

  Later these functions get bound to 'dispatch' fires the actual event
  Right now they just return an object

  It's a code convention to use all capitals and snake case for the event names
  We use const to store the name of the event so it is immutable

*/
import axios from 'axios';

import { ADD_PRODACT, RECEIVE_PRODUCTS, ALL_PRODUCTS, UPDATE_PRODUCT, SEARCH_PRODUCT, PRODUCTS_SEARCH_RESULT, INITIAL_PRODUCT_VALUES, DELETE_PRODUCT } from './productTypes';

const ROOT_URL = 'http://localhost:3090';

export const addProduct = (product) => {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/products`, {
      ...product
    })
      .then(response => {
        dispatch({
          type: ADD_PRODACT,
          product: response.data
        });
      })
      .catch((err) => {
        console.log(err)
      });
  }
}

export const getAllProducts = (skip, limit) => {
  return function(dispatch) {
    axios.get(`${ROOT_URL}/products`, {
      params: {
        skip,
        limit
      }
    })
      .then(response => {
        dispatch({
          type: RECEIVE_PRODUCTS,
          products: response.data
        });
      })
      .catch((err) => {
        console.log("error", err)
      });
  }
}

export const findProductsFromArrayOfIds = (productArr, type, getFromServer) => {
  return function(dispatch) {
    axios.get(`${ROOT_URL}/findProductsFromArrayOfIds`, {
      params: {
        arr: productArr
      }
    })
      .then(response => {
        dispatch({
          type: type || PRODUCTS_SEARCH_RESULT,
          products: response.data,
          getFromServer
        });
      })
      .catch((err) => {
        console.log("error", err)
      });
  }
}

export const setInitialProductValues = (products) => {
  return {
    type: INITIAL_PRODUCT_VALUES,
    products
  };
}


export const removeProduct = (productId) => {
  return (dispatch) => {
    axios.delete(`${ROOT_URL}/removeProduct/${productId}`).then((response) => {
      dispatch({
        type: DELETE_PRODUCT,
        product: response.data
      })
    }).catch((err) => {
      console.log("error", err)
    });
  }
}

