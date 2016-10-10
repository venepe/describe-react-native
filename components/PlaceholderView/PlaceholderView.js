'use strict';

import React, { Component, PropTypes } from 'react';
import { StyleSheet, View } from 'react-native';

class PlaceholderView extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <View style={[styles.container]}>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'stretch'
  },
});

export default PlaceholderView;
