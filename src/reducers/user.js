import { SIGN_USER, UNSIGN_USER, USER_STATUS, USER_IS_NEW, UPDATE_USER } from 'actions/userTypes';

export default function(state = {}, action) {
  switch (action.type) {
    case SIGN_USER:
      var user = action.user;
      return {
        ...state,
        ...user,
        isNew: action.isNew
      };
      break;
    case UNSIGN_USER:
      var user = action.user
      return {
        ...user
      }
      break;
    case USER_IS_NEW:
      var isNew = action.isNew
      return {
        ...state,
        isNew: action.isNew
      }
      break;
    case UPDATE_USER:
      var user = action.user
      return {
        ...user
      }
      break;
  }

  return state;
}
