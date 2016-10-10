'use strict';

import React, { Component, PropTypes } from 'react';
import { Navigator, StyleSheet, Text, TouchableOpacity } from 'react-native';
const Icon = require('react-native-vector-icons/MaterialIcons');

class GroupAddNavigationButton extends Component {
  static propTypes = {
    onPress: PropTypes.func,
    isDisabled: PropTypes.bool,
    numOfInvitations: PropTypes.number,
  }

  static defaultProps = {
    onPress: function() {},
    isDisabled: false,
    numOfInvitations: 0,
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
    let numOfInvitations = this.props.numOfInvitations;
    if (numOfInvitations > 5) {
      numOfInvitations = '>';
    } else if (numOfInvitations === 0) {
      numOfInvitations = '';
    }

    return (
      <TouchableOpacity style={styles.container} onPress={this._onPress} activeOpacity={activeOpacity}>
        <Icon name='group-add' size={32} style={[styles.rightNavIcon, disableStyle]} >
        </Icon>
        <Text style={styles.label}>{numOfInvitations}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  },
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
  },
  label: {
    position: 'absolute',
    right: 4,
    top: 2,
    color: '#FF4081',
    backgroundColor: 'transparent',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Roboto'
  },
});

export default GroupAddNavigationButton;
