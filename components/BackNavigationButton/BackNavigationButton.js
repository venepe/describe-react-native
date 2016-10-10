'use strict';

import React, { Component, PropTypes } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
const Icon = require('react-native-vector-icons/EvilIcons');

class BackNavigationButton extends Component {
  static propTypes = {
    onPress: PropTypes.func
  }

  static defaultProps = {
    onPress: function() {}
  }

  constructor(props) {
    super(props);
    this._goBack = this._goBack.bind(this);
  }

  _goBack() {
    if (this.props.navigator) {
      this.props.navigator.pop();
    } else {
      this.props.onPress();
    }
  }

  render() {
    return (
      <TouchableOpacity style={{backgroundColor: 'transparent'}} onPress={this._goBack}>
        <Icon name='chevron-left' size={40} style={styles.leftNavIcon} >
        </Icon>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  leftNavIcon: {
    width: 40,
    height: 40,
    left: 5,
    top: 5,
    color: '#FF4081',
  },
});

export default BackNavigationButton;
