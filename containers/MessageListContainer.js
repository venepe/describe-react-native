'use strict';

import React, { Component, PropTypes } from 'react';
import { InteractionManager } from 'react-native';
import Relay from 'react-relay';
import MessageListView from '../components/MessageListView';
import PlaceholderView from '../components/PlaceholderView';
import RelayView from '../components/RelayView';
import { ChannelRoute } from '../routes';
import { applyForceFetch } from '../stores/ForceFetchStore';

export default class MessageListContainer extends RelayView {
  static propTypes = {
    channelId: PropTypes.string,
  }

  static defaultProps = {
    channelId: '',
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

    let channelId = this.props.channelId;
    let channelRoute = new ChannelRoute({channelId});
    let forceFetch = applyForceFetch(channelId);

    return (
       <Relay.RootContainer Component={MessageListView} route={channelRoute} forceFetch={forceFetch} renderLoading={this.renderLoading} renderFailure={this.renderFailure} renderFetched={data => <MessageListView {...data} navigator={this.props.navigator} /> } />
    );
  }

  _renderPlaceholderView() {
    return (
      <PlaceholderView />
    )
  }
}
