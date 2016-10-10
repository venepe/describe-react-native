'use strict';

import React, { Component, PropTypes } from 'react';
import { ScrollView, ToolbarAndroid, View } from 'react-native';
import Relay from 'react-relay';
import TestCaseForm from '../TestCaseForm';
import { Common } from '../../styles';
import { UpdateTestCaseMutation } from '../../mutations';
import { isValidTestCase } from '../../lib/utilities';

class TestCaseUpdateFormView extends Component {
  constructor(props) {
    super(props);
    this._onUpdate = this._onUpdate.bind(this);
    this._onChangeIt = this._onChangeIt.bind(this);
    this._onActionSelected = this._onActionSelected.bind(this);

    this.state = {
      isDisabled: true,
      text: props.testCase.text
    }
  }

  _onActionSelected(position) {
    if (position === 0) {
      this._onUpdate();
    }
  }

  _onUpdate() {
    let text = this.state.text;
    if (isValidTestCase(text)) {
      Relay.Store.commitUpdate(
        new UpdateTestCaseMutation({text, testCase: this.props.testCase})
      );
      this.props.navigator.pop();
    }

  }

  _onChangeIt(text) {
    let isDisabled = true;
    if (isValidTestCase(text)) {
      isDisabled = false;
    }
    this.setState({
      text,
      isDisabled
    });
  }

  render() {

    return (
      <View style={{flex: 1}}>
        <ToolbarAndroid title='Edit Moment' titleColor='#FFFFFF' style={{backgroundColor: '#607d8b', height: 56,}} actions={[{title: 'Update', icon: require('image!ic_check'), show: 'always'}]} onActionSelected={this._onActionSelected}/>
        <TestCaseForm title={this.props.project.text} text={this.props.testCase.text} onChangeIt={this._onChangeIt}  />
    </View>
    );
  }
}

export default Relay.createContainer(TestCaseUpdateFormView, {
  fragments: {
    testCase: () => Relay.QL`
      fragment on TestCase {
        text,
        ${UpdateTestCaseMutation.getFragment('testCase')}
      }
    `,
    project: () => Relay.QL`
      fragment on Project {
        text
      }
    `,
  },
});
