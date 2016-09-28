import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './App';
import Home from 'pages/home/home';
import Signin from 'components/auth/signin';
import Signout from 'components/auth/signout';
import Signup from 'components/auth/signup';
import InsertProdact from 'pages/insertProdact'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} /> 
    <Route path="home" component={Home}/> 
    <Route path="signout" component={Signout}/> 
    <Route path="newProdact" component={InsertProdact}/> 
  </Route>
);
