'use strict';

import React, { Component, PropTypes } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

class TouchableText extends Component {
  static propTypes = {
    id: PropTypes.string,
    text: PropTypes.string,
    onPress: PropTypes.func,
    onLongPress: PropTypes.func
  }

  static defaultProps = {
    id: '',
    text: '',
    onPress: function() {},
    onLongPress: function() {}
  }

  constructor(props) {
    super(props);
    this._onPress = this._onPress.bind(this);
    this._onLongPress = this._onLongPress.bind(this);
    let style = props.style || styles.text;
    this.state = {
      text: props.text,
      id: props.id,
      style: props.style
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
        <TouchableOpacity onPress={this._onPress} onLongPress={this._onLongPress}>
          <Text style={this.state.style}>{this.state.text}</Text>
        </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    color: '#212121',
    fontSize: 17,
    fontWeight: '300',
    fontFamily: 'Roboto'
  },
});

export default TouchableText;
