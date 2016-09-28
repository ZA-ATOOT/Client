import React from 'react';

import Header from 'common/header/header';
import Footer from 'common/footer/footer';
import Auth from 'components/auth/auth';

export default class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount(){

  }

  render(){
    var { children, ...rest } = this.props;
    console.log(this.props) 
    const token = localStorage.getItem('token')
    return (
      token ?
      <div id="container" dir="rtl">        
        <Header {...rest}/>
        {React.cloneElement(children, rest)}
      </div> : <Auth />
    );
  }
}



