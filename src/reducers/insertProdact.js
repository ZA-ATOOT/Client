import { INSERT_PRODACT } from 'actions/types';

export default (state = [], action) => {
  switch (action.type) {      
    case INSERT_PRODACT:
        console.log("isert reduser", state)
    var prodact = action.prodact
      return [
        ...state, {...prodact}
      ];
  }

  return state;
}
