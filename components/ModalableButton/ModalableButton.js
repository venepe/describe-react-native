'use strict';

import React, { Component, PropTypes } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
const Icon = require('react-native-vector-icons/MaterialIcons');

class ModalableButton extends Component {
  static propTypes = {
    onPress: PropTypes.func
  }

  static defaultProps = {
    onPress: function() {}
  }

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <View style={[styles.container]}>
      <TouchableOpacity onPress={this.props.onPress} style={[this.props.style]}>
        <Icon name='more-horiz' size={30} style={styles.icon} >
        </Icon>
      </TouchableOpacity>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    opacity: .3,
    padding: 2,
    borderWidth: 2,
    borderColor: '#f5f5f5',
    borderRadius: 5,
  },
  icon: {
    width: 30,
    height: 30,
    opacity: 3,
    color: '#000000',
    backgroundColor: 'transparent',
  },
});

export default ModalableButton;
