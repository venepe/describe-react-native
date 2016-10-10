'use strict';

import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import SpinnerView from '../SpinnerView';

class FailureView extends Component {
  constructor(props) {
    super(props);
    this._retry = this._retry.bind(this);
    this.state = {
      message: 'This just failed...',
      retry: props.retry,
      isLoading: false,
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      retry: nextProps.retry,
      isLoading: false,
    });
  }

  _retry() {
    this.setState({
      isLoading: true,
    });
    this.state.retry();
  }

  render() {
    let text = 'Retry?';
    if (this.state.isLoading) {
      return (
        <SpinnerView />
      )
    }
    return (
       <TouchableOpacity onPress={this._retry}>
        <View style={[styles.container]}>
          <View style={[styles.textContainer]}>
            <Text style={[styles.label]}>{this.state.message}</Text>
          </View>
          <View style={[styles.textContainer]}>
            <Text style={[styles.label]}>{text}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: 'transparent',
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#000000',
    fontSize: 17,
    fontWeight: '300',
    fontFamily: 'Roboto',
  },
});

export default FailureView;
