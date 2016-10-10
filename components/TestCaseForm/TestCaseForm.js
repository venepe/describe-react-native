'use strict';

import React, { Component, PropTypes } from 'react';
import { ScrollView, View } from 'react-native';
import Relay from 'react-relay';
// const uuid = require('node-uuid');
import { Common } from '../../styles';
import Archy from '../Archy';
import ArchyLabel from '../ArchyLabel';
import ArchyInput from '../ArchyInput';
import { getTestCasePlaceholderText } from '../../lib/utilities';

class TestCaseForm extends Component {
  static propTypes = {
    onChangeIt: PropTypes.func,
    title: PropTypes.string,
    text: PropTypes.string
  }

  static defaultProps = {
    onChangeIt: function() {},
    title: '',
    text: ''
  }

  constructor(props) {
    super(props);
    const testCasePlaceholder = getTestCasePlaceholderText();
    this._onChangeIt = this._onChangeIt.bind(this);
    this._getUUID = this._getUUID.bind(this);

    this.state = {
      archible: {
        component: (<ArchyLabel text={'describe'} />),
        key: this._getUUID(),
        nodes: [
          {
            component: (<ArchyLabel text={this.props.title} />),
            key: this._getUUID(),
            nodes: [
              {
                component: (<ArchyLabel text={'it should'} />),
                key: this._getUUID(),
                nodes: [
                  {
                    component: (<ArchyInput text={props.text} onChangeText={this._onChangeIt} placeholder={testCasePlaceholder} />),
                    key: this._getUUID(),
                    nodes: [],
                  },
                ],
              }
            ],
          },
        ],
      },
      isDisabled: true,
      text: props.text
    }
  }

  _onChangeIt(text) {
    this.setState({
      text
    });
    this.props.onChangeIt(text);
  }

  _getUUID() {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i=0; i < 8; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }

  render() {

    return (
      <View style={[Common.maxContainer]}>
        <ScrollView>
          <Archy archible={this.state.archible}/>
          <View style={{height: this.state.keyboardSpace}}></View>
        </ScrollView>
      </View>
    );
  }
}

export default TestCaseForm;
