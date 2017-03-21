import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Main from './Main';
import Home from 'pages/home/home';
import Searrch from 'pages/search/search';
//import Signin from 'components/auth/signin';
//import Signout from 'components/auth/signout';
//import Signup from 'components/auth/signup';

export default (
  <Route path="/" component={Main}>
    <IndexRoute component={Home} />
    <Route path="/search" component={Searrch} />
  </Route>
);
