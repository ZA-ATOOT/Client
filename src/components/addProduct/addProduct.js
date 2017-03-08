import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import * as actions from 'actions/actionCreators';
import products from 'data/products'

import loader from 'images/loader.gif';

import style from './addProduct.css';

class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showNewProduct: false,
      showLoader: false
    }
  }
  handleNewProdact({title, description, image, price, age, sellerId,location, seller}) {
    this.setState({
      showLoader: true
    })
    this.props.addProduct({title, description, image, price, age, sellerId,location,seller})
  }

  render() {
    const {handleSubmit, user} = this.props;
    return (
      <div className={ style.newProductWrapper }>
        { this.state.showLoader &&
          <div className={ style.loaderWrapper }>
            <img src={ loader } width="100" className={ style.loader } />
          </div> }
        <form onSubmit={ handleSubmit(this.handleNewProdact.bind(this)) }>
          <Field name="title" placeholder="title" component="input" />
          <Field name="description" placeholder="description" component="input" />
          <Field name="image" placeholder="image" component="input" />
          <Field name="price" placeholder="price" component="input" />
          <Field name="age" placeholder="age" component="input" />
          <Field name="location" placeholder="location" component="input" />
          <Field name="sellerId"
            placeholder="sellerId"
            component="input"
            type="hidden" />
          { /*<Field name="categories" placeholder="categories" component="input" />*/ }
          <input type="submit" className="btn" />
        </form>
      </div>
      );
  }
}

function mapStateToProps(state) {
  return {
    products: state.products,
    user: state.user,
    initialValues: {
      title: "אוברול",
      description: "אוברול מגניב",
      image: "https://s-media-cache-ak0.pinimg.com/736x/8b/b0/91/8bb091c65651375a34a07e0e7cacb9ad.jpg",
      price: 20,
      age: "3M",
      location: "אנילביץ 49/8 ראשון-לציון",
      seller: state.user
    }
  };
}


let addProdactForm = reduxForm({
  form: 'AddProduct',
  fields: ['title', 'description', 'image', 'price', 'age', 'sellerId']
})(AddProduct);

export default connect(mapStateToProps, actions)(addProdactForm)
