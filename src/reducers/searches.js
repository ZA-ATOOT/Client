import { ALL_SEARCHES } from 'actions/searchTypes';

export default function(state = null, action) {
	console.log("delete")
  switch (action.type) {
    case ALL_SEARCHES:
      var result = action.searches
      return [
        ...result
      ]
  }

  return state;
}
