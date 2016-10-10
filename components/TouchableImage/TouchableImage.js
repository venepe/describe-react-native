'use strict';

import React, { Component, PropTypes } from 'react';
import { Image, TouchableOpacity } from 'react-native';

class TouchableImage extends Component {
  static propTypes = {
    id: PropTypes.string,
    onPress: PropTypes.func,
    onLongPress: PropTypes.func
  }

  static defaultProps = {
    id: '',
    source: null,
    style: null,
    onPress: function() {},
    onLongPress: function() {}
  }

  constructor(props) {
    super(props);
    this._onPress = this._onPress.bind(this);
    this._onLongPress = this._onLongPress.bind(this);
    this.state = {
      source: props.source,
      style: props.style,
      id: props.id
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...nextProps
    });
  }

  _onPress() {
    this.props.onPress(this.state.id);
  }

  _onLongPress() {
    this.props.onLongPress(this.state.id);
  }

  render() {

    return (
      <TouchableOpacity style={this.state.style} onPress={this._onPress} onLongPress={this._onLongPress}>
        <Image style={{flex: 1}} source={this.state.source}></Image>
      </TouchableOpacity>
    );
  }
}

export default TouchableImage;
