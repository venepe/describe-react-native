'use strict';

import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
const Dimensions = require('Dimensions');
import Relay from 'react-relay';
import CoverImage from '../CoverImage';

class CoverImageView extends Component {
  constructor(props) {
    super(props);
    this._onDelete = this._onDelete.bind(this);
    this._onUpdate = this._onUpdate.bind(this);
  }

  _onDelete() {
    this.props.navigator.pop();
  }

  _onUpdate() {
    this.props.navigator.pop();
  }

  render() {
    return (
      <View style={styles.imageContainer}>
        <CoverImage style={styles.image} coverImage={this.props.coverImage} user={this.props.user} onDelete={this._onDelete} onUpdate={this._onUpdate} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    alignItems: 'stretch',
  },
  image: {
    flex: 1
  },
});

export default Relay.createContainer(CoverImageView, {
  fragments: {
    coverImage: () => Relay.QL`
      fragment on File {
        ${CoverImage.getFragment('coverImage')},
      }
    `,
    user: () => Relay.QL`
      fragment on User {
        ${CoverImage.getFragment('user')},
      }
    `,
  },
});
