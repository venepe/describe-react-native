'use strict';

import React, { Component, PropTypes } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
const Icon = require('react-native-vector-icons/MaterialIcons');

class EditButton extends Component {
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
      <TouchableOpacity onPress={this.props.onPress} style={[this.props.style, {backgroundColor: 'transparent', padding: 5}]}>
        <Icon name='mode-edit' size={30} style={styles.icon} >
        </Icon>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30,
    marginRight: 5,
    color: '#616161',
    backgroundColor: 'transparent',
  },
});

export default EditButton;
