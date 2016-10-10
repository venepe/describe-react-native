'use strict';

import React, { Component } from 'react';
import { InteractionManager } from 'react-native';
import Relay from 'react-relay';
import InviteeFormView from '../components/InviteeFormView';
import PlaceholderView from '../components/PlaceholderView';
import { ProjectRoute } from '../routes';

export default class CreateInviteeScene extends Component {
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

    var projectRoute = new ProjectRoute({projectId: this.props.route.passProps.projectId, meId: this.props.route.passProps.meId});
    return (
       <Relay.RootContainer Component={InviteeFormView} route={projectRoute} renderFetched={data => <InviteeFormView {...data} navigator={this.props.navigator} /> } />
    );
  }

  _renderPlaceholderView() {
    return (
      <PlaceholderView />
    )
  }
}
