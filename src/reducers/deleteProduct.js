import { DELETE_PRODUCT } from 'actions/productTypes';

export default function (state = null , action) {
  switch (action.type) {
    case DELETE_PRODUCT:
      return action.product
      break;
  }
	return state
}