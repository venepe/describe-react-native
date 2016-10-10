'use strict';

import React, { Component, PropTypes } from 'react';
import { InteractionManager } from 'react-native';
import Relay from 'react-relay';
import TestCaseListView from '../components/TestCaseListView';
import PlaceholderView from '../components/PlaceholderView';
import RelayView from '../components/RelayView';
import { ProjectRoute } from '../routes';
import { applyForceFetch } from '../stores/ForceFetchStore';

export default class TestCaseListContainer extends RelayView {
  static propTypes = {
    projectId: PropTypes.string,
    meId: PropTypes.string,
  }

  static defaultProps = {
    projectId: '',
    meId: '',
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

    let projectId = this.props.projectId;
    let meId = this.props.meId;
    let navigator = this.props.navigator;
    let projectRoute = new ProjectRoute({projectId, meId});
    let forceFetch = applyForceFetch(projectId);

    return (
       <Relay.RootContainer Component={TestCaseListView} route={projectRoute} forceFetch={forceFetch} renderLoading={this.renderLoading} renderFailure={this.renderFailure} renderFetched={data => <TestCaseListView {...data} navigator={navigator} /> } />
    );
  }

  _renderPlaceholderView() {
    return (
      <PlaceholderView />
    )
  }
}
