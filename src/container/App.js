import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as productActions from 'actions/productActions';

/*
  Components
  This is where the actual interface / view comes into play
  Everything is in Main - so we import that one
*/

import Main from './Main';

/*
  Mapping

  This is where the magic of redux comes in.

  We need a way to make
  1. our state (our data)
  2. our 'dispatch' functions
  available to the <Main /> component.

  We will surface state and functions via props (this.props.whatever)

*/


/*
  Here we specify which state needs to be made avaialble to the component
*/

function mapStateToProps(state) {
  return {
    
  };
}

/*
  This will bind our actions to dispatch (make the fire-able)
  and make the actions available via props
*/

export function mapDispatchToProps(dispatch) {
  return bindActionCreators(productActions, dispatch);
}


/*
  Here we create an <App/> component which is just our <Main/> component with it's props
  populated with our actions and our state

  We're injecting the data at the top level and passing it down, but you can connect() any component to make the actions and the store available to you.
*/

var App = connect(mapStateToProps)(Main);

export default App;
