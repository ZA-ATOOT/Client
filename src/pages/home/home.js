import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from 'actions/actionCreators';
import prodatcList from 'data/prodatcList';
import style from './home.css'

var prodactItems = {
  title: "חולצות",
  description: "מתאים לגילאי 5-10",
  image: "http://ourson.co.il/images/babys/ourson-baby-2.jpg",
  price: "70",
  changeOptions: true,

}

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lagreImg: "",
      showImg: false
    }
  }
  imgPopup = (img, showImg) => {
    this.setState({
      lagreImg: img,
      showImg: showImg
    });
  }

  render() {
    const {img, showImg} = this.state;
    console.log("home", this.props)
    var items = prodatcList.map((val, i) => {
      return (
        <div key={ i } className={ style.item }>
          <div className={ style.description }>
            <div>
              { val.title }
            </div>
            <hr />
            <div>
              { val.description }
            </div>
          </div>
          <div className={ style.img } style={ { backgroundImage: `url(${val.image}` } } onClick={ this.imgPopup.bind(null, val.image, true) }></div>
          <div className={ style.details }>
            <div>
              { val.price } תותים
            </div>
            <hr />
            <div className={ style.detailsBtn }>
              <button>פרטים</button>
              <div className={ style.btns }>
                <input readOnly type="checkbox" checked={ val.changeOptions } />
                <label>החלפה</label>
              </div>
            </div>
          </div>
        </div>
      )
    });

    var imagePopup = <div className={ style.popupWrapper }>
                       <div className={ style.popup }>
                         <span className={ style.closePoup } onClick={ this.imgPopup.bind(null, null, false) }>X</span>
                         <img src={ this.state.lagreImg } />
                       </div>
                     </div>
    return (
      <div>
        <div className={ style.itemsWrapper }>
          { items }
        </div>
        { showImg ? imagePopup : "" }
      </div>
      );
  }
}


const mapStateToProps = (state) => {
  console.log(state)
  return {
    prodatcList: state.prodatcList
  }
}

export default connect(mapStateToProps, actions)(Home)


