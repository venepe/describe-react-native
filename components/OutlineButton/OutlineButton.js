'use strict';

import React, { Component, PropTypes } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

class OutlineButton extends Component {
  static propTypes = {
    title: PropTypes.string,
    onPress: PropTypes.func,
    underlayColor: PropTypes.string,
    borderColor: PropTypes.string,
    textColor: PropTypes.string
  }

  static defaultProps = {
    title: '',
    onPress: function() {},
    underlayColor: '#99d9f4',
    borderColor: '#FFFFFF',
    textColor: '#FFFFFF'
  }

  constructor(props) {
    super(props);
    this._onPress = this._onPress.bind(this);
    this.state = {
      borderColor: props.borderColor,
      underlayColor: props.underlayColor,
      title: props.title,
      textColor: props.textColor
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...nextProps
    });
  }

  _onPress(e) {
    this.props.onPress(e);
  }

  render() {
    return (
      <TouchableOpacity style={[styles.outlineButton, {borderColor: this.state.borderColor}]} onPress={this._onPress}>
        <Text style={[styles.outlineButtonText, {color: this.state.textColor}]}>{this.state.title}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  outlineButton: {
    height: 36,
    backgroundColor: 'transparent',
    marginBottom: 10,
    borderWidth: 1,
    padding: 20,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  outlineButtonText: {
    fontSize: 18,
    alignSelf: 'center',
    fontFamily: 'Roboto',
    fontWeight: '400'
  },
});

export default OutlineButton;
