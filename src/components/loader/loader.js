import React, { Component } from 'react';

import loader from 'images/loader.gif';

import style from './loader.css';

export default class Loader extends Component {
  render() {
    return (
      <img className={style.loader} src={ loader } />
    )
  }
}

