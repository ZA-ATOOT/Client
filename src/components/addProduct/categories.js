import React, { Component } from 'react';
import { Field } from 'redux-form';

import categoriesHe from 'data/categoriesHe1';

import style from './addProduct.css';
const renderField = ({input, label, type, value, meta: {touched, error}}) => (
  <label>
    <input {...input} type={ type } value={ label } />
    { label }
  </label>
)

export default class Categories extends Component {
  render() {
    const {otherCategories} = this.props
    return (
      <ul className={ style.categoriesWrapper }>
        { categoriesHe.map((val, index) => {
            return (
              <li key={ `group${index}` } className={ style.category }>
                <div className={ style.group }>
                  { val.title }
                </div>
                <ul>
                  { val.categories && val.categories.map((category, i) => {
                      return (
                        <li key={ `category${i}` }>
                          <label>
                            { category.title }
                          </label>
                          <ul>
                            { category.items.map((item, z) => {
                                return (
                                  <li key={ `item${z}` }>
                                    <Field name={ item }
                                      type="checkbox"
                                      component={ renderField }
                                      label={ item } />
                                  </li>
                                )
                              }) }
                          </ul>
                        </li>
                      )
                    }) }
                  { val.items && val.items.map((item, z) => {
                      return (
                        <li key={ `item${z}` }>
                          <Field name={ item }
                            type="checkbox"
                            component={ renderField }
                            label={ item } />
                        </li>
                      )
                    }) }
                </ul>
              </li>
            )
          }) }
        <li className={ style.category }>
          <ul>
            <li className={ style.moreCategories }>
              <div className={ style.group }>
                אחר
              </div>
              <label>
                הוסף קטגוריות נוספת כאשר פסיק (,) מפריד בניהן עד 3 קטגוריות
                <br />
                <span>לדוגמא: עגלה,משטח החתלה, מגבות</span>
              </label>
              <Field name="otherCategories" type="input" component={ renderField } />
              <div className={ style.otherTetx }>
                { otherCategories && otherCategories.split(",").map((val, index) => {
                    if (index < 3) {
                      return (
                        <div key={ index }>
                          { val }
                        </div>
                      )
                    }
                  }) }
              </div>
            </li>
          </ul>
        </li>
      </ul>
    )
  }
}

