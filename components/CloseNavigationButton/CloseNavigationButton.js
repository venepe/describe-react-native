'use strict';

import React, { Component, PropTypes } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
const Icon = require('react-native-vector-icons/EvilIcons');

class CloseNavigationButton extends Component {
  static propTypes = {
    side: PropTypes.string,
    onPress: PropTypes.func
  }

  static defaultProps = {
    side: 'right',
    onPress: function() {}
  }

  constructor(props) {
    super(props);
    let style = (props.side === 'left') ? styles.leftNavIcon : styles.rightNavIcon;
    this._closeModal = this._closeModal.bind(this);
    this.state = {
      style
    };
  }

  _closeModal() {
    if (this.props.navigator) {
      this.props.navigator.pop();
    } else {
      this.props.onPress();
    }
  }

  render() {
    return (
      <TouchableOpacity onPress={this._closeModal}>
        <Icon name='close' size={32} style={this.state.style} >
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

export default CloseNavigationButton;
