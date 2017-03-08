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

import { getAllProducts } from 'actions/actionCreators'


// Routes
import Routes from 'container/Routes';

// Base styling
import './base.css';

/* Import our data store */
import store, { history } from './store';

store.dispatch(getAllProducts());

// ID of the DOM element to mount app on
const DOM_APP_EL_ID = 'app';

// Render the router
ReactDOM.render((
  <Provider store={store}>
    { /* Tell the Router to use our enhanced history */ }
    <Router history={history}>
      {Routes}
    </Router>
  </Provider>
), document.getElementById(DOM_APP_EL_ID));
