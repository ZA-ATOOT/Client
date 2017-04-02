import { INITIAL_PRODUCT_VALUES } from 'actions/productTypes';

export default function(state = null, action) {
  switch (action.type) {
    case INITIAL_PRODUCT_VALUES:
      var products = action.products
      return products
  }

  return state;
}
