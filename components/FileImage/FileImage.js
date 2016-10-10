'use strict';

import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import TouchableImage from '../TouchableImage';

class FileImage extends Component {
  static propTypes = {
    onPress: PropTypes.func
  }

  static defaultProps = {
    onPress: function() {}
  }

  constructor(props) {
    super(props);
    this._onPress = this._onPress.bind(this);

    this.state = {
      style: props.style
    }
  }

  _onPress() {
    this.props.onPress(this.props.file.id);
  }

  render() {
    let uri = null;
    let id = '';
    if (this.props.file) {
      uri = this.props.file.uri;
      id = this.props.file.id;
    }
    return (
      <TouchableImage id={id} style={this.state.style} source={{uri: uri}} onPress={this._onPress} />
    );
  }
}

export default Relay.createContainer(FileImage, {
  fragments: {
    file: () => Relay.QL`
      fragment on File {
        id
        uri
      }
    `,
  },
});
