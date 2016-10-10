'use strict';

import React, { Component, PropTypes } from 'react';
import { InteractionManager } from 'react-native';
import Relay from 'react-relay';
import TestCaseEventListView from '../components/TestCaseEventListView';
import PlaceholderView from '../components/PlaceholderView';
import RelayView from '../components/RelayView';
import { TestCaseRoute } from '../routes';
import { applyForceFetch } from '../stores/ForceFetchStore';

export default class TestCaseEventListContainer extends RelayView {
  static propTypes = {
    testCaseId: PropTypes.string,
    projectId: PropTypes.string,
  }

  static defaultProps = {
    testCaseId: '',
    projectId: '',
  }

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

    let testCaseId = this.props.testCaseId;
    let projectId = this.props.projectId;
    let navigator = this.props.navigator;
    let testCaseRoute = new TestCaseRoute({testCaseId, projectId});
    let forceFetch = applyForceFetch(testCaseId);

    return (
       <Relay.RootContainer Component={TestCaseEventListView} route={testCaseRoute} forceFetch={forceFetch} renderLoading={this.renderLoading} renderFailure={this.renderFailure} renderFetched={data => <TestCaseEventListView {...data} navigator={navigator} /> } />
    );
  }

  _renderPlaceholderView() {
    return (
      <PlaceholderView />
    )
  }
}
