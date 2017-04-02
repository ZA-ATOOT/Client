import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, formValueSelector } from 'redux-form';

import * as productActions from 'actions/productActions';

import Categories from './categories';
import Popup from 'components/popup/popup';
import Loader from 'components/loader/loader';

import imagePlaceholder from 'images/imagePlaceholder.png';

import style from './addProduct.css';

const validate = values => {
  const errors = {}
  if (!values.title) {
    errors.title = true;
  }
  if (!values.description) {
    errors.description = true;
  }
  if (!values.image) {
    errors.image = true;
  }
  if (!values.price) {
    errors.price = true;
  }
  if (!values.age) {
    errors.age = true;
  }
  if (!values.city) {
    errors.city = true;
  }
  if (!values.address) {
    errors.address = true;
  }
  return errors
}

const renderField = ({input, placeholder, type, list, meta: {touched, error}}) => (
  <input {...input}
    placeholder={ placeholder }
    type={ type }
    list={ list }
    className={ `${style.textInput} ${touched && error && style.required}` } />
)

const renderFieldTextarea = ({input, placeholder, type, list, meta: {touched, error}}) => (
  <textarea {...input}
    placeholder={ placeholder }
    type={ type }
    className={ `${style.textareaInput} ${touched && error && style.required}` } />
)

class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showNewProduct: false,
      showLoader: false,
      addCategoryMsg: false
    }
  }
  handleNewProdact({title, description, image, price, age, sellerId, location, seller, city, address, otherCategories, ...categoriesArr}) {

    var categories = [];
    for (var item in categoriesArr) {
      categories.push(item)
    }

    if (categories.length == 0 && !otherCategories) {
      console.log(categories)
      this.setState({
        addCategoryMsg: true
      })
      window.setTimeout(() => {
        this.setState({
          addCategoryMsg: false
        })
      }, 2000)
      return
    }
    this.setState({
      showLoader: true
    })
    this.props.addProduct({
      title,
      description,
      image,
      price,
      age,
      seller,
      location,
      city,
      address,
      otherCategories,
      categories
    })
  }

  render() {
    const {handleSubmit, user, initialValues, image, otherCategories, title, productToEdit} = this.props;
    return (
      <div className={ style.newProductWrapper } dir="rtl">
        { this.state.showLoader &&
          <div className={ style.loaderWrapper }>
            <Loader />
          </div> }
        <div className={ style.addProductTitle }>
          {title}
        </div>
        <hr />
        <form className={ style.form } onChange={ this.onChange } onSubmit={ handleSubmit(this.handleNewProdact.bind(this)) }>
          <div className={ style.formWrapper }>
            <div className={ style.productInfo }>
              <Field name="title"
                placeholder="כותרת"
                type="text"
                component={ renderField } />
              <Field name="description"
                placeholder="תיאור"
                type="text"
                component={ renderFieldTextarea } />
              <Field name="price"
                placeholder="מחיר"
                type="text"
                component={ renderField } />
              <Field name="age"
                placeholder="גיל"
                type="text"
                component={ renderField } />
              <Field name="city"
                placeholder="עיר"
                type="text"
                component={ renderField } />
              <Field name="address"
                placeholder="כתובת"
                type="text"
                component={ renderField } />
              <Field name="sellerId"
                type="hidden"
                component={ renderField } />
            </div>
            <div className={ style.productImage }>
              <div className={ style.imageWrapper } style={ { backgroundImage: `url(${image ? image : imagePlaceholder})` } }></div>
              <Field name="image"
                placeholder="תמונה"
                type="text"
                component={ renderField } />
            </div>
          </div>
          <div className={ style.categoriesTitle }>
            קטגוריות <span>(בחר לפחות קטגוריה אחת)</span>
          </div>
          <Categories otherCategories={ otherCategories } />
          { this.state.addCategoryMsg && <div className={ style.addCategoryMsg }>
                                           *בבקשה הוסף לפחות קטגוריה אחת
                                         </div> }
          <input className={ style.submitForm } type="submit" />
        </form>
      </div>
      );
  }
}

const selector = formValueSelector('AddProduct')
function mapStateToProps(state) {
  return {
    products: state.products,
    user: state.user,
    image: selector(state, "image"),
    otherCategories: selector(state, "otherCategories"),
    initialValues: state.initialProductValues
  };
}


let addProdactForm = reduxForm({
  form: 'AddProduct',
  fields: ['title', 'description', 'image', 'price', 'age', 'sellerId'],
  validate
})(AddProduct);

export default connect(mapStateToProps, productActions)(addProdactForm)
