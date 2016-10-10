'use strict';

import React, { Component } from 'react';
import { ProgressBarAndroid, StyleSheet, View } from 'react-native';

class SpinnerView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.spinner}><ProgressBarAndroid indeterminate={true} styleAttr={'Small'} /></View>
    );
  }
}

const styles = StyleSheet.create({
  spinner: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#FAFAFA',
  }
});

export default SpinnerView;
