'use strict';

import React, { Component } from 'react';
import { InteractionManager } from 'react-native';
import Relay from 'react-relay';
import ProjectEventListView from '../components/ProjectEventListView';
import PlaceholderView from '../components/PlaceholderView';
import RelayView from '../components/RelayView';
import { ProjectRoute } from '../routes';
import { applyForceFetch } from '../stores/ForceFetchStore';

export default class ProjectEventScene extends RelayView {
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

    let projectId = this.props.route.passProps.projectId;
    let projectRoute = new ProjectRoute({meId: this.props.route.passProps.meId, projectId});
    let forceFetch = applyForceFetch(projectId);

    return (
       <Relay.RootContainer Component={ProjectEventListView} route={projectRoute} forceFetch={forceFetch} renderLoading={this.renderLoading} renderFailure={this.renderFailure} renderFetched={data => <ProjectEventListView {...data} navigator={this.props.navigator} /> } />
    );
  }

  _renderPlaceholderView() {
    return (
      <PlaceholderView />
    )
  }
}
