'use strict';

import React, { Component, PropTypes } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import ArchyLabel from '../ArchyLabel';

class TouchableArchyLabel extends Component {
  static propTypes = {
    id: PropTypes.string,
    text: PropTypes.string,
    onPress: PropTypes.func
  }

  static defaultProps = {
    id: '',
    text: '',
    onPress: function() {}
  }

  constructor(props) {
    super(props);
    this._onPress = this._onPress.bind(this);
    this.state = {
      id: props.id,
      text: props.text
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      text: nextProps.text
    });
  }

  _onPress() {
    this.props.onPress(this.state.id);
  }

  render() {

    return (
        <TouchableOpacity onPress={this._onPress}>
          <ArchyLabel text={this.state.text} />
        </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: 'transparent'
  },
});

export default TouchableArchyLabel;
