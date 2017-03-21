/**
* App entry point
*/

// Polyfill
import 'babel-polyfill';

// Libraries
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router';

import { getAllProducts } from 'actions/productActions';
import { getAllSearches } from 'actions/searchActions';
import { signinUser, loginStatus } from 'actions/userActions';
import loaders from 'components/socialLogin/loaders';
import StaticFunctions from 'staticFunctions/staticFunctions';


// Routes
import Routes from 'container/Routes';

// Base styling
import './base.css';

/* Import our data store */
import store, { history } from './store';

var ui = StaticFunctions.getLocalStorage("_ui", false, true)
if (ui) {
  store.dispatch(signinUser(StaticFunctions.getLocalStorage("_ui", false, true)))
} else {
  loaders.facebook(document, "", "171334156706202").then((val) => {
    store.dispatch(loginStatus(val));
  })
}
store.dispatch(getAllProducts());
store.dispatch(getAllSearches());


// ID of the DOM element to mount app on
const DOM_APP_EL_ID = 'app';

// Render the router
ReactDOM.render((
  <Provider store={ store }>
    { /* Tell the Router to use our enhanced history */ }
    <Router history={ history }>
      { Routes }
    </Router>
  </Provider>
  ), document.getElementById(DOM_APP_EL_ID));
