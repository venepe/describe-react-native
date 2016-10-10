'use strict';

import React, { Component, PropTypes } from 'react';
import { ScrollView, ToolbarAndroid, View } from 'react-native';
import Relay from 'react-relay';
import TestCaseForm from '../TestCaseForm';
import { Common } from '../../styles';
import { IntroduceTestCaseMutation } from '../../mutations';
import SMTIAnalytics from '../../lib/SMTIAnalytics';
import { isValidTestCase } from '../../lib/utilities';

class TestCaseFormView extends Component {
  constructor(props) {
    super(props);
    this._onCreate = this._onCreate.bind(this);
    this._onChangeIt = this._onChangeIt.bind(this);
    this._onActionSelected = this._onActionSelected.bind(this);

    this.state = {
      isDisabled: true,
      keyboardSpace: 0,
      text: ''
    }
  }

  _onActionSelected(position) {
    if (position === 0) {
      this._onCreate();
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
      <ToolbarAndroid title='Add Moment' titleColor='#FFFFFF' style={{backgroundColor: '#607d8b', height: 56,}} actions={[{title: 'Add', icon: require('image!ic_check'), show: 'always'}]} onActionSelected={this._onActionSelected}/>
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
