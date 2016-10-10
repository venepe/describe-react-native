'use strict';

import React, { Component, PropTypes } from 'react';
import NavigationBar from 'react-native-navbar';
import CloseNavigationButton from '../CloseNavigationButton';

class SettingsNavigationBar extends Component {
  static propTypes = {
    onPress: PropTypes.func,
    title: PropTypes.string
  }

  static defaultProps = {
    onPress: function() {},
    title: ''
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <NavigationBar title={{title: this.props.title, tintColor: '#373e4d'}} leftButton={<CloseNavigationButton side={'left'} onPress={this.props.onPress}/>} />
    );
  }
}

export default SettingsNavigationBar;
