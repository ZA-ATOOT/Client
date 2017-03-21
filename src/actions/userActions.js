/**
  Action Creators

  These fire events which the reducer will handle
  We will later call these functions from inside our component

  Later these functions get bound to 'dispatch' fires the actual event
  Right now they just return an object

  It's a code convention to use all capitals and snake case for the event names
  We use const to store the name of the event so it is immutable

*/
import axios from 'axios';

import { SIGN_USER, UNSIGN_USER, USER_STATUS, USER_IS_NEW, UPDATE_USER } from './userTypes';

import { history } from '../store';

const ROOT_URL = 'http://localhost:3090';

export function signinUser(user) {
  return function(dispatch) {
    // Submit user to the server
    axios.post(`${ROOT_URL}/signin`, user)
      .then(response => {
        // If request is good...
        // - Update state to indicate user is authenticated
        dispatch({
          type: SIGN_USER,
          user: response.data.user,
          isNew: response.data.isNew
        });

      })
      .catch((err) => {
        // If request is bad...
        // - Show an error to the user
        console.log(err)
      });
  }
}
export const updateUser = (userId, param) =>{
  return function(dispatch) {
    axios.put(`${ROOT_URL}/user/${userId}`,{
      ...param
    })
      .then(response => {
        dispatch({
          type: UPDATE_USER,
          user: response.data
        });
      })
      .catch((err) => {
        console.log("error", err)
      });
  }
}

export const updateUserArray = (userId, param) =>{
  return function(dispatch) {
    axios.put(`${ROOT_URL}/userArray/${userId}`,{
      ...param
    })
      .then(response => {
        dispatch({
          type: UPDATE_USER,
          user: response.data
        });
      })
      .catch((err) => {
        console.log("error", err)
      });
  }
}

export const addLikeShare = (userId, param) =>{
      console.log(param)
  return function(dispatch) {
    axios.put(`${ROOT_URL}/addLikeShare/${userId}`,{
      ...param
    })
      .then(response => {
        dispatch({
          type: UPDATE_USER,
          user: response.data
        });
      })
      .catch((err) => {
        console.log("error", err)
      });
  }
}

export function changeIsNew(isNew) {
  return {
    type: USER_IS_NEW,
    isNew
  };
}

export function loginStatus(status) {
  return {
    type: USER_STATUS,
    status
  };
}

export function signoutUser(user) {
  return {
    type: UNSIGN_USER,
    user
  };
}
