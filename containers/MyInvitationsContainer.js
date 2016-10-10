'use strict';

import React, { Component } from 'react';
import { InteractionManager } from 'react-native';
import Relay from 'react-relay';
import MyInvitationsView from '../components/MyInvitationsView';
import PlaceholderView from '../components/PlaceholderView';
import RelayView from '../components/RelayView';
import { MeRoute } from '../routes';

export default class MyInvitationsContainer extends RelayView {
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

    let meId = this.props.meId;
    let navigator = this.props.navigator;
    var meRoute = new MeRoute({meId});
    return (
       <Relay.RootContainer Component={MyInvitationsView} route={meRoute} renderLoading={this.renderLoading} renderFailure={this.renderFailure} renderFetched={data => <MyInvitationsView {...data} navigator={navigator} /> } />
    );
  }

  _renderPlaceholderView() {
    return (
      <PlaceholderView />
    )
  }
}
