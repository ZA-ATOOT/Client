import axios from 'axios';

import { ALL_SEARCHES, MORE_OF_THE_SANE } from './searchTypes';

const ROOT_URL = 'http://localhost:3090';

export const getAllSearches = (text) => {
  return function(dispatch) {
    axios.get(`${ROOT_URL}/getAllSearches`)
      .then(response => {
        dispatch({
          type: ALL_SEARCHES,
          searches: response.data
        });
      })
      .catch((err) => {
        console.log("error", err)
      });
  }
}
