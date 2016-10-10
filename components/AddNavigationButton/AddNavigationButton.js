'use strict';

import React, { Component, PropTypes } from 'react';
import { Navigator, StyleSheet, TouchableOpacity } from 'react-native';
const Icon = require('react-native-vector-icons/MaterialIcons');

class AddNavigationButton extends Component {
  static propTypes = {
    onPress: PropTypes.func,
    isDisabled: PropTypes.bool
  }

  static defaultProps = {
    onPress: function() {},
    isDisabled: false
  }

  constructor(props) {
    super(props);
    this._onPress = this._onPress.bind(this);
    this.state = {
      isDisabled: props.isDisabled
    }
  }

  _onPress() {
    if (!this.state.isDisabled) {
      this.props.onPress();
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      isDisabled: nextProps.isDisabled
    });
  }

  render() {
    let disableStyle = (this.state.isDisabled) ? styles.disabled : styles.abled;
    let activeOpacity = (this.state.isDisabled) ? 1.0 : 0.2;
    return (
      <TouchableOpacity onPress={this._onPress} activeOpacity={activeOpacity}>
        <Icon name='add' size={32} style={[styles.rightNavIcon, disableStyle]} >
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
    top: 5,
    color: '#FF4081'
  },
  disabled : {
    opacity: 0.2
  },
  abled: {
    opacity: 1.0
  }
});

export default AddNavigationButton;
