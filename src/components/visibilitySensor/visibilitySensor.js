import React from 'react';
import ReactDOM from 'react-dom';

var containmentPropType = React.PropTypes.any;

if (typeof window !== 'undefined') {
  containmentPropType = React.PropTypes.instanceOf(Element);
}

export default class VisibilitySensor extends React.Component {
  constructor(props) {
    super(props);

    this.startWatching = this.startWatching.bind(this);
    this.stopWatching = this.stopWatching.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.check = this.check.bind(this);

    this.state = {
      isVisible: null,
      visibilityRect: {},
      width: 0
    }
  }
  componentWillMount(){
    if(this.props.active){
      window.addEventListener("resize", this.handleResize)
    } 
  }

  componentDidMount() {    
    if (this.props.active) {
      this.setState({width: this.refs.visibilitySensor.getBoundingClientRect().width});
      this.startWatching();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
    this.stopWatching();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.active) {
      this.setState({...this.state});
      this.startWatching();
    } else {
      this.stopWatching();
    }
  }

  startWatching() {
    if (this.interval) { return; }
    this.interval = setInterval(this.check, this.props.delay);
    // if dont need delayed call, check on load ( before the first interval fires )
    !this.props.delayedCall && this.check();
  }

  stopWatching() {
    this.interval = clearInterval(this.interval);
  }

  handleResize() {
    this.setState({width: this.refs.visibilitySensor.getBoundingClientRect().width});
  }

  /**
  * Check if the element is within the visible viewport
  */
  check() {
    var el = ReactDOM.findDOMNode(this);
    var rect;
    var containmentRect;

    // if the component has rendered to null, dont update visibility
    if (!el) {
      return this.state;
    }

    rect = el.getBoundingClientRect();

    if (this.props.containment) {
      containmentRect = this.props.containment.getBoundingClientRect();
      containmentRect.top -= this.props.offsetTop;
      containmentRect.bottom += this.props.offsetBottom;
    } else {
      containmentRect = {
        top: - this.props.offsetTop,
        left: 0,
        bottom: (window.innerHeight + this.props.offsetBottom) || (document.documentElement.clientHeight + this.props.offsetBottom),
        right: (window.innerWidth + 10000) || (document.documentElement.clientWidth + 10000)
      };
    }

    var visibilityRect = {
      top: rect.top >= containmentRect.top,
      left: rect.left >= containmentRect.left,
      bottom: rect.bottom <= containmentRect.bottom,
      right: rect.right <= containmentRect.right
    };

    var fullVisible = (
      visibilityRect.top &&
      visibilityRect.left &&
      visibilityRect.bottom &&
      visibilityRect.right
    );

    var isVisible = fullVisible;

    // check for partial visibility
    if (this.props.partialVisibility) {
      var partialVertical =
      (rect.top >= containmentRect.top && rect.top <= containmentRect.bottom)           // Top is visible
      || (rect.bottom >= containmentRect.top && rect.bottom <= containmentRect.bottom)  // Bottom is visible
      || (rect.top <= containmentRect.top && rect.bottom >= containmentRect.bottom);    // Center is visible


      var partialHorizontal =
      (rect.left >= containmentRect.left && rect.left <= containmentRect.right)         // Left side is visible
      || (rect.right >= containmentRect.left && rect.right <= containmentRect.right)    // Right side is visible
      || (rect.left <= containmentRect.left && rect.right >= containmentRect.right);    // Center is visible

      var partialVisible = partialVertical && partialHorizontal;

      // if we have minimum top visibility set by props, lets check, if it meets the passed value
      // so if for instance element is at least 200px in viewport, then show it.
      isVisible = this.props.minTopValue
      ? partialVisible && rect.top <= (containmentRect.bottom - this.props.minTopValue)
      : partialVisible
    }

    var state = this.state
    // notify the parent when the value changes
    if (this.state.isVisible !== isVisible) {
      state = {
        isVisible: isVisible,
        visibilityRect: visibilityRect
      };
      this.setState(state);
      this.props.onChange && this.props.onChange(isVisible, visibilityRect);
    }

    if(this.state.isVisible){
      //this.setState({initialHeight: rect.bottom - rect.top});
    }
    return state;
  }

  render() {
    const { className } = this.props;

    if(!this.props.active){
      return (
        <div className={ className }>{this.props.children}</div>
      )
    } else {
      
      const { isVisible } = this.state;

      var value = (this.state.width);    

      var valueHeight = (value/624)*383;

      const elStyles = { minHeight: valueHeight+13 };
      const elClasses = (
        (isVisible ? `isVisible ` : '') +
        (className ? `${className}` : '')
      );

      return (
        <div className={elClasses} style={elStyles} ref="visibilitySensor">
          {isVisible && this.props.children}
        </div>
      )
    }
  }
}

VisibilitySensor.propTypes = {
  onChange: React.PropTypes.func,
  active: React.PropTypes.bool,
  partialVisibility: React.PropTypes.bool,
  delay: React.PropTypes.number,
  delayedCall: React.PropTypes.bool,
  containment: containmentPropType,
  children: React.PropTypes.element,
  minTopValue: React.PropTypes.number,
  offsetTop: React.PropTypes.number,
  offsetBottom: React.PropTypes.number,
  //height: React.PropTypes.any.isRequired
}

VisibilitySensor.defaultProps = {
  active: false,
  partialVisibility: false,
  minTopValue: 0,
  delay: 1000,
  delayedCall: false,
  containment: null,
  children: React.createElement('span'),
  offsetTop:500,
  offsetBottom:500,
  //height: "initial"
}