import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import * as productActions from 'actions/productActions';

import SearchResult from './searchResult';


import icons from 'elegantFont.css';

import style from './searchProduct.css';

class SearchProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: "",
      foucus: false
    }
  }
  
  componentWillMount() {
    this.setSearchOnreload();
  }

  onChange = (e) => {
    this.setState({
      searchText: e.target.value
    })
  }

  setSearchOnreload = () => {
    const {query} = this.props.routing.locationBeforeTransitions;
    const {searches} = this.props;

    if (!query || !query.q) {
      browserHistory.push("/")
      return
    }
    if (!searches) {
      window.setTimeout(() => {
        this.setSearchOnreload()
      }, 1000)
      return
    }

    if (searches && query && query.q) {
      var searchResult = searches.reduce((all, item, index) => {
        if (item._id.indexOf(query.q) > -1) {
          all.push(item.value.documents)
        }
        return all
      }, []);
      this.getItems(...searchResult)
    }
  }

  showResultDropDwon = (show) => {
    this.setState({
      foucus: show
    });
  }

  getItems = (items) => {
    this.setState({
      foucus: false
    });
    this.props.findProductsFromArrayOfIds(items)
  }

  render() {
    const {searches} = this.props;
    return (
      <div>
        <input type="text"
          data-name="showResult"
          className={ style.searchInput }
          placeholder="חפש"
          onFocus={ this.showResultDropDwon.bind(null, true) }
          onChange={ this.onChange } />
        <span className={ `${style.icon_search} ${icons.icon_search}` }></span>
        { this.state.foucus && <SearchResult getItems={ this.getItems } searchText={ this.state.searchText } showResultDropDwon={ this.showResultDropDwon } /> }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    searches: state.searches,
    productsSearchResult: state.productsSearchResult,
    routing: state.routing
  };
}

export default connect(mapStateToProps, productActions)(SearchProduct);
