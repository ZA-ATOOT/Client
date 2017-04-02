import { USER_LIKES_AND_SHARES, ADD_LIKE_AND_SHARE } from "actions/userTypes";

export default function(state = {}, action) {

  switch (action.type) {
    case USER_LIKES_AND_SHARES:
      var products = action.products
      return {
        getFromServer: action.getFromServer,
        products: [
          ...products
        ]
      }
      break;
    case ADD_LIKE_AND_SHARE:
      /*console.log("action = ", action)
      console.log("state = ", state )
      console.log("-----------------")*/
      var product = action.product
      if (action.isOn && state.products) {
        var removeProduct = state.products.filter(function(el) {
          return el._id !== product._id;
        });
        return {
          getFromServer: state.getFromServer,
          products: [
            ...removeProduct
          ]
        }
      }
      var stateProducts = state.products || [];
      return {
        getFromServer: state.getFromServer,
        products: [
          product, ...stateProducts
        ]
      }
      break;
  }

  return state;
}
