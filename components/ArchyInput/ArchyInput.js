'use strict';

import React, { Component, PropTypes } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import Relay from 'react-relay';

class ArchyInput extends Component {
  static propTypes = {
    text: PropTypes.string,
    id: PropTypes.string,
    onChangeText: PropTypes.func,
    placeholder: PropTypes.string
  }

  static defaultProps = {
    text: '',
    id: null,
    onChangeText: function() {},
    placeholder: ''
  }

  constructor(props) {
    super(props);
    this._onChangeText = this._onChangeText.bind(this);
    this.state = {
      text: props.text,
    }
  }

  _onChangeText(text) {
    this.setState({
      text: text,
    });
    this.props.onChangeText(text);
  }

  render() {

    return (
      <View style={styles.textboxContainer}>
        <TextInput autoFocus={true} style={styles.textbox} placeholder={this.props.placeholder} onChangeText={this._onChangeText}
          onEndEditing={this._onEndEditing} value={this.state.text} returnKeyType={'done'} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textboxContainer: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: 'white'
  },
  textbox: {
    height: 36,
    fontSize: 20,
    color: '#212121',
    fontWeight: '500',
    fontFamily: 'Roboto',
  },
});

export default ArchyInput;
