'use strict';

import React, { Component, PropTypes } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
const Icon = require('react-native-vector-icons/MaterialIcons');

class SettingsNavigationButton extends Component {
  static propTypes = {
    side: PropTypes.string,
    onPress: PropTypes.func
  }

  static defaultProps = {
    side: 'left',
    onPress: function() {}
  }

  constructor(props) {
    super(props);
    this._onPress = this._onPress.bind(this);
    let style = (props.side === 'right') ? styles.rightNavIcon : styles.leftNavIcon;
    this.state = {
      style
    };
  }

  _onPress(e) {
    this.props.onPress(e);
  }

  render() {
    return (
      <TouchableOpacity onPress={this._onPress}>
        <Icon name='more-horiz' size={32} style={this.state.style} >
        </Icon>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  rightNavIcon: {
    width: 32,
    height: 32,
    right: 10,
    top: 8,
    color: '#FF4081',
  },
  leftNavIcon: {
    width: 32,
    height: 32,
    left: 10,
    top: 8,
    color: '#FF4081',
  },
});

export default SettingsNavigationButton;
