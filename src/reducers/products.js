import { ADD_PRODACT, RECEIVE_PRODUCTS, UPDATE_PRODUCT } from 'actions/productTypes';

export default (state = [], action) => {
  switch (action.type) {
    case ADD_PRODACT:
      var product = action.product
      return [
        ...state, {
          ...product
        }
      ];
    case RECEIVE_PRODUCTS:
      return action.products
      break;
    case UPDATE_PRODUCT:
    console.log(state)
      return [
        ...state
      ];
      break;
  }

  return state;
}
