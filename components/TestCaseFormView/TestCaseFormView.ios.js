'use strict';

import React, { Component, PropTypes } from 'react';
import { ScrollView, View } from 'react-native';
import Relay from 'react-relay';
import NavigationBar from 'react-native-navbar';
import TestCaseForm from '../TestCaseForm';
import { Common } from '../../styles';
import CloseNavigationButton from '../CloseNavigationButton';
import CheckNavigationButton from '../CheckNavigationButton';
import { IntroduceTestCaseMutation } from '../../mutations';
import SMTIAnalytics from '../../lib/SMTIAnalytics';
import { isValidTestCase } from '../../lib/utilities';

class TestCaseFormView extends Component {
  constructor(props) {
    super(props);
    this._onCreate = this._onCreate.bind(this);
    this._closeModal = this._closeModal.bind(this);
    this._onChangeIt = this._onChangeIt.bind(this);

    this.state = {
      isDisabled: true,
      text: ''
    }
  }

  _onCreate() {
    let text = this.state.text;
    if (isValidTestCase(text)) {
      Relay.Store.commitUpdate(
        new IntroduceTestCaseMutation({text, project: this.props.project})
      );

      //Start SMTIAnalytics
      SMTIAnalytics.track(SMTIAnalytics.Events.ADDED_TEST_CASE);
      //End SMTIAnalytics

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
        <NavigationBar title={{title: 'Add Moment', tintColor: '#373e4d'}} leftButton={<CloseNavigationButton side={'left'} onPress={this._closeModal}/>} rightButton={<CheckNavigationButton isDisabled={this.state.isDisabled} onPress={this._onCreate}/>} />
        <TestCaseForm title={this.props.project.text} onChangeIt={this._onChangeIt}  />
      </View>
    );
  }
}

export default Relay.createContainer(TestCaseFormView, {
  fragments: {
    project: () => Relay.QL`
      fragment on Project {
        text,
        ${IntroduceTestCaseMutation.getFragment('project')}
      }
    `,
    me: () => Relay.QL`
      fragment on User {
        id
      }
    `,
  },
});
