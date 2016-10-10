'use strict';

import React, { Component, PropTypes } from 'react';
import { ProgressBarAndroid, StyleSheet, Text, TouchableHighlight, View } from 'react-native';

class SpinnerButton extends Component {
  static propTypes = {
    title: PropTypes.string,
    onPress: PropTypes.func,
    underlayColor: PropTypes.string,
    backgroundColor: PropTypes.string,
    textColor: PropTypes.string,
    showSpinner: PropTypes.bool
  }

  static defaultProps = {
    title: '',
    onPress: function() {},
    underlayColor: '#99d9f4',
    backgroundColor: '#48BBEC',
    textColor: '#FFFFFF',
    showSpinner: false
  }

  constructor(props) {
    super(props);
    this._onPress = this._onPress.bind(this);
    this.state = {
      backgroundColor: props.backgroundColor,
      underlayColor: props.underlayColor,
      title: props.title,
      textColor: props.textColor,
      showSpinner: props.showSpinner
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
    let btn = (this.state.showSpinner) ? (<ProgressBarAndroid indeterminate={true} styleAttr={'Small'} style={styles.spinner} />) : null;
    return (
      <TouchableHighlight style={[{backgroundColor: this.state.backgroundColor}]} onPress={this._onPress} activeOpacity={.2} underlayColor={this.state.underlayColor}>
        <View style={styles.spinnerButton}>
        {btn}
        <Text style={[styles.defaultButtonText, {color: this.state.textColor}]}>{this.state.title}</Text>
      </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  spinnerButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 36,
    padding: 20,
  },
  defaultButtonText: {
    fontSize: 18,
    alignSelf: 'center',
    fontFamily: 'Roboto-Thin',
    fontWeight: '500'
  },
  spinner: {
    marginRight: 20
  }
});

export default SpinnerButton;
