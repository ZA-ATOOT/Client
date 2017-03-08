import { USER_STATUS } from 'actions/userTypes';

export default function(state = {}, action) {
  switch (action.type) {
    case USER_STATUS:
      var status = action.status
      return {
        ...status
      }
  }

  return state;
}
