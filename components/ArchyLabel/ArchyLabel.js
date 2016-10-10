'use strict';

import React, { Component, PropTypes } from 'react';
import { StyleSheet, Text, View } from 'react-native';

class ArchyLabel extends Component {
  static propTypes = {
    text: PropTypes.string
  }

  static defaultProps = {
    text: ''
  }

  constructor(props) {
    super(props);
    this.state = {
      text: props.text
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...nextProps
    });
  }

  render() {
    return (
      <View style={[styles.container]}>
        <Text style={[styles.label]}>{this.state.text}</Text>
      </View>
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
  label: {
    color: '#212121',
    fontSize: 20,
    fontWeight: '400',
    fontFamily: 'Roboto',
  },
});

export default ArchyLabel;
