'use strict';

import React, { Component, PropTypes } from 'react';
import { ScrollView, View } from 'react-native';
import Relay from 'react-relay';
import NavigationBar from 'react-native-navbar';
import TestCaseForm from '../TestCaseForm';
import { Common } from '../../styles';
import CloseNavigationButton from '../CloseNavigationButton';
import CheckNavigationButton from '../CheckNavigationButton';
import { UpdateTestCaseMutation } from '../../mutations';
import { isValidTestCase } from '../../lib/utilities';

class TestCaseUpdateFormView extends Component {
  constructor(props) {
    super(props);
    this._onUpdate = this._onUpdate.bind(this);
    this._closeModal = this._closeModal.bind(this);
    this._onChangeIt = this._onChangeIt.bind(this);

    this.state = {
      isDisabled: true,
      text: props.testCase.text
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

  _closeModal() {
    this.props.navigator.pop();
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
        <NavigationBar title={{title: 'Edit Moment', tintColor: '#373e4d'}} leftButton={<CloseNavigationButton side={'left'} onPress={this._closeModal}/>} rightButton={<CheckNavigationButton isDisabled={this.state.isDisabled} onPress={this._onUpdate}/>} />
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
