'use strict';

import React, { Component, PropTypes } from 'react';
import { StyleSheet, Text, TouchableHighlight } from 'react-native';

class DefaultButton extends Component {
  static propTypes = {
    title: PropTypes.string,
    onPress: PropTypes.func,
    underlayColor: PropTypes.string,
    backgroundColor: PropTypes.string,
    textColor: PropTypes.string,
  }

  static defaultProps = {
    title: '',
    onPress: function() {},
    underlayColor: '#99d9f4',
    backgroundColor: '#48BBEC',
    textColor: '#FFFFFF',
  }

  constructor(props) {
    super(props);
    this._onPress = this._onPress.bind(this);
    this.state = {
      backgroundColor: props.backgroundColor,
      underlayColor: props.underlayColor,
      title: props.title,
      textColor: props.textColor,
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
      <TouchableHighlight style={[styles.defaultButton, {backgroundColor: this.state.backgroundColor}]} onPress={this._onPress} activeOpacity={.2} underlayColor={this.state.underlayColor}>
        <Text style={[styles.defaultButtonText, {color: this.state.textColor}]}>{this.state.title}</Text>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  defaultButton: {
    height: 36,
    marginBottom: 10,
    padding: 20,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  defaultButtonText: {
    fontSize: 18,
    alignSelf: 'center',
    fontFamily: 'Roboto-Thin',
    fontWeight: '500',
  },
});

export default DefaultButton;
