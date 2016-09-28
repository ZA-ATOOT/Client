import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

/*
Reducers

Reducers match up the dispatched (fired) action with a function that should be called.

It takes in a copy of state, modifies it, and returns the new state
When state gets large, it makes sense to have multiple reducers that only deal with a piece of the state

*/

import { routerReducer } from 'react-router-redux'; // we need this for react-router
import authReducer from './authReducer';
import insertProdact from './insertProdact';
// Combine all our reducers togeher
const rootReducer = combineReducers({
  form,
  auth: authReducer,
  prodatcList: insertProdact,
  routing: routerReducer
});

export default rootReducer;
