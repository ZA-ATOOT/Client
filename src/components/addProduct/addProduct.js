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
    errors.title = 'שדה חובה'
  }
  if (!values.description) {
    errors.description = 'שדה חובה'
  }
  if (!values.image) {
    errors.image = 'שדה חובה'
  }
  if (!values.price) {
    errors.price = 'שדה חובה'
  }
  if (!values.age) {
    errors.age = 'שדה חובה'
  }
  if (!values.city) {
    errors.city = 'שדה חובה'
  }
  if (!values.address) {
    errors.address = 'שדה חובה'
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
  handleNewProdact({title, description, image, price, age, sellerId, location, seller, city, address,otherCategories, ...categoriesArr}) {
    
    var categories = [];
    for (var item in categoriesArr){
      categories.push(item)
    }

    if(categories.length == 0 && !otherCategories){
      console.log(categories)
      this.setState({addCategoryMsg: true})
      window.setTimeout(()=>{
        this.setState({addCategoryMsg: false})
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
    const {handleSubmit, user, initialValues, image, otherCategories} = this.props;
    return (
      <div className={ style.newProductWrapper } dir="rtl">
        { this.state.showLoader &&
          <div className={ style.loaderWrapper }>
            <Loader />
          </div> }
        <div className={ style.addProductTitle }>
          הוסף מוצר
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
                placeholder="sellerId"
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
          <Categories otherCategories={otherCategories}/>
          {this.state.addCategoryMsg && <div className={style.addCategoryMsg}>*בבקשה הוסף לפחות קטגוריה אחת</div> }
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
    initialValues: {
      title: "אוברול",
      description: "אוברול מגניב",
      image: "https://s-media-cache-ak0.pinimg.com/736x/8b/b0/91/8bb091c65651375a34a07e0e7cacb9ad.jpg",
      price: 20,
      age: "3M",
      city: state.user.city,
      address: state.user.address,
      seller: state.user
    }
  };
}


let addProdactForm = reduxForm({
  form: 'AddProduct',
  fields: ['title', 'description', 'image', 'price', 'age', 'sellerId'],
  validate
})(AddProduct);

export default connect(mapStateToProps, productActions)(addProdactForm)
