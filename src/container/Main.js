import React, { Component } from 'react';

import Footer from 'common/footer/footer';
//import Auth from 'components/auth/auth';

export default class Main extends Component {
  render(){
    return (
      /*token ?*/
      <div id="container">  
        {this.props.children}
      </div> /*: <Auth />*/
    );
  }
}



