import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import * as userActions from 'actions/userActions';
import israelCities from 'data/israelCities'
import Loader from 'components/loader/loader';

import style from './addUserDetails.css';
const validate = values => {
  const errors = {}
  if (!values.username) {
    errors.username = 'שדה חובה'
  }
  if (!values.email) {
    errors.email = 'שדה חובה'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if (!values.address) {
    errors.address = 'שדה חובה'
  }
  if (!values.city) {
    errors.city = 'שדה חובה'
  }
  return errors
}

const renderField = ({input, label, type, list, meta: {touched, error}}) => (
  <div>
  <span className={style.requiredStar}>*</span>
    <input {...input} placeholder={ label } type={ type } list={list} className={`${style.textInput} ${touched && error && style.required}`}/>
   {/* { touched && (error && <span className={style.required}>{ error }</span>) }*/}
  </div>
)

class AddUserDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoader: false
    }
  }

  handleAddUserDetails({city, address}) {
    this.setState({
      showLoader: true
    })
    this.props.nextStep({city, address, isNewUser: false})
  }

  isNewUser = () => {
    this.props.updateUser(this.props.user.id, {
      isNewUser: false
    })
  }

  render() {
    const {handleSubmit, user} = this.props;
    return (
      <div className={ style.addUserDetailsWrapper }>
        { this.state.showLoader &&
          <div className={ style.loaderWrapper }>
            <Loader />
          </div> }
          <div className={style.explanation}>אנא מלא את התיבות כדי להמשיך</div>
        <form onSubmit={ handleSubmit(this.handleAddUserDetails.bind(this)) }>
        <Field name="city"
            label="הקלד עיר מגורים"
            type="text"
            list="cities"
            component={ renderField } />
          <datalist id="cities">
          { israelCities.map((city, index) => {
                return (
                  <option key={ index } value={ city.name }>
                    { city.name }
                  </option>
                )
              }) }
          </datalist>
          <Field name="address"
            label="הקלד כתובת מגורים"
            type="text"
            component={ renderField } />
            <div className={style.requiredText}>*שדות חובה</div>
          <input type="submit" className={style.submit} value="שלח" />
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
    }
  };
}


let addUserDetailsForm = reduxForm({
  form: 'AddUserDetails',
  fields: ['city', 'address', 'phoneNumber'],
  validate
})(AddUserDetails);

export default connect(mapStateToProps, userActions)(addUserDetailsForm)
