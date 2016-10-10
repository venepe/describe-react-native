'use strict';

import React, { Component } from 'react';
import { DeviceEventEmitter } from 'react-native';

class InputView extends Component {
  constructor(props) {
    super(props);
    this._updateKeyboardSpace = this._updateKeyboardSpace.bind(this);
    this._resetKeyboardSpace = this._resetKeyboardSpace.bind(this);
    this.updateKeyboardSpace = this.updateKeyboardSpace.bind(this);
    this.resetKeyboardSpace = this.resetKeyboardSpace.bind(this);
  }

  _updateKeyboardSpace(e) {
    if (e.end) {
      this.updateKeyboardSpace(e.end.height);
    }
  }

  _resetKeyboardSpace() {
    this.resetKeyboardSpace(0);
  }

  updateKeyboardSpace(height) {

  }

  resetKeyboardSpace() {

  }

  componentDidMount() {
    DeviceEventEmitter.addListener('keyboardWillShow', (e) => this.updateKeyboardSpace(e));
    DeviceEventEmitter.addListener('keyboardWillHide', (e) => this.resetKeyboardSpace(e));
  }

  componentWillUnmount() {
    DeviceEventEmitter.removeAllListeners('keyboardWillShow');
    DeviceEventEmitter.removeAllListeners('keyboardWillHide');
  }

}

export default InputView;
