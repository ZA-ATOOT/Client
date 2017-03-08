import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './App';
import Home from 'pages/home/home';
//import Signin from 'components/auth/signin';
//import Signout from 'components/auth/signout';
//import Signup from 'components/auth/signup';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
  </Route>
);
