'use strict';

import React, { Component } from 'react';
import { InteractionManager } from 'react-native';
import Relay from 'react-relay';
import TestCaseUpdateFormView from '../components/TestCaseUpdateFormView';
import PlaceholderView from '../components/PlaceholderView';
import RelayView from '../components/RelayView';
import { TestCaseRoute } from '../routes';

export default class UpdateTestCaseScene extends RelayView {
  constructor(props) {
    super(props);
    this.state = {
      renderPlaceholderOnly: true
    };
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({
        renderPlaceholderOnly: false
      })
    });
  }

  render() {
    if (this.state.renderPlaceholderOnly) {
      return this._renderPlaceholderView();
    }

    var testCaseRoute = new TestCaseRoute({testCaseId: this.props.route.passProps.testCaseId, projectId: this.props.route.passProps.projectId});
    return (
       <Relay.RootContainer Component={TestCaseUpdateFormView} route={testCaseRoute} renderLoading={this.renderLoading} renderFailure={this.renderFailure} renderFetched={data => <TestCaseUpdateFormView {...data} navigator={this.props.navigator} /> } />
    );
  }

  _renderPlaceholderView() {
    return (
      <PlaceholderView />
    )
  }
}
