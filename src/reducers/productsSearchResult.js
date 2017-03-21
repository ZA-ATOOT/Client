import { PRODUCTS_SEARCH_RESULT } from 'actions/productTypes';

export default function(state = [], action) {
  switch (action.type) {
    case PRODUCTS_SEARCH_RESULT:
      var products = action.products;
      return [
          ...products
      ]
  }

  return state;
}
