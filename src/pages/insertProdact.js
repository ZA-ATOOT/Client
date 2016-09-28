import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import * as actions from 'actions/actionCreators';
import prodatcList from 'data/prodatcList'

//import style from './header.css'

class NewProdact extends Component {
  handleProdact({title, description, image, price, changeOptions}) {
    this.props.insertProdact({
      title,
      description,
      image,
      price,
      changeOptions
    })

  }

  render() {
    const {handleSubmit} = this.props;
    console.log("NewProdact", this.props);
    return (
      <div>
        <form onSubmit={ handleSubmit(this.handleProdact.bind(this)) }>
          <Field name="title" placeholder="title" component="input" />
          <Field name="description" placeholder="description" component="input" />
          <Field name="image" placeholder="image" component="input" />
          <Field name="price" placeholder="price" component="input" />
          <Field name="changeOptions" placeholder="changeOptions" component="input" />
          <input type="submit" className="btn" />
        </form>
      </div>
      );
  }
}

function mapStateToProps(state) {
  return {
    prodatcList
  };
}


let insertyProdactForm = reduxForm({
  form: 'insertProdact',
  fields: ['email', 'password']
})(NewProdact);

export default connect(mapStateToProps, actions)(insertyProdactForm)
