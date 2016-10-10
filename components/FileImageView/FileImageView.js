'use strict';

import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
const Dimensions = require('Dimensions');
import Relay from 'react-relay';
import FileImage from '../FileImage';

class FileImageView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.imageContainer}>
        <FileImage style={styles.image} file={this.props.file} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    alignItems: 'stretch'
  },
  image: {
    flex: 1
  },
});

export default Relay.createContainer(FileImageView, {
  fragments: {
    file: () => Relay.QL`
      fragment on File {
        ${FileImage.getFragment('file')},
      }
    `,
  },
});
