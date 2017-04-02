import { ALL_SEARCHES, MORE_OF_THE_SANE } from 'actions/searchTypes';

export default function(state = [], action) {
  switch (action.type) {
    case MORE_OF_THE_SANE:
      var products = action.products
      return [
        ...products
      ]
  }

  return state;
}
