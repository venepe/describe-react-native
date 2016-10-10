'use strict';

import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import ChannelNavigationBar from '../components/ChannelNavigationBar';
import { ChannelRoute } from '../routes';

export default class ChannelNavigationBarContainer extends Component {
  static propTypes = {
    channelId: PropTypes.string,
    title: PropTypes.string,
  }

  static defaultProps = {
    channelId: '',
    title: 'Channel',
  }

  constructor(props) {
    super(props);
  }

  render() {

    let channelId = this.props.channelId;
    let channelRoute = new ChannelRoute({channelId});

    return (
       <Relay.RootContainer Component={ChannelNavigationBar} route={channelRoute} renderFetched={data => <ChannelNavigationBar {...data} navigator={this.props.navigator} title={this.props.title} /> } />
    );
  }
}
