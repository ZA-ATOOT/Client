import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as productActions from 'actions/productActions';

import style from './searchProduct.css';

class SearchResult extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResult: "",
    }
  }

  componentWillMount() {
    document.body.addEventListener('click', this.bodyClicked)
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this.bodyClicked)
  }

  bodyClicked = (e) => {
    if (e.target.dataset.name != "showResult") {
      this.props.showResultDropDwon(false)
    }
  }

  render() {
    const {searchText, getItems} = this.props;

    var searchResult = "";
    var targetVal = searchText.trim().replace(/[ ]{2,}/g, " ");
    searchResult = this.props.searches.reduce((all, item, index) => {
      if (searchText && item._id.indexOf(searchText) > -1) {
        all.push(
          <li key={ index } className={ style.result } data-name="showResult">
            <Link to={ `search?q=${item._id}` } data-name="showResult" onClick={ getItems.bind(null, item.value.documents) }>
            { item._id }
            </Link>
          </li>
        )
      }
      return all
    }, [])
    
    return (
      <ul className={ style.resultWrapper } data-name="showResult">
        { searchResult }
      </ul>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    searches: state.searches
  };
}

export default connect(mapStateToProps, productActions)(SearchResult);