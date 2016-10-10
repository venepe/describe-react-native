'use strict';

import React, { Component, PropTypes } from 'react';
import { StyleSheet, ToolbarAndroid } from 'react-native';
import BackNavigationButton from '../BackNavigationButton';

class SMTINavigationBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...nextProps
    });
  }

  render() {
    let backButton = (this.state.hidePrev) ? null : (<BackNavigationButton side={'left'}/>)
    let customPrev = this.state.customPrev || backButton;

    return (
      <ToolbarAndroid title={this.state.title} titleColor='#FFFFFF' style={{backgroundColor: '#607d8b', height: 56}} navigator={this.props.navigator} route={this.props.route}/>
    );
  }
}

export default SMTINavigationBar;
