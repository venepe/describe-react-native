'use strict';

import Relay from 'react-relay';

export default class ChannelRoute extends Relay.Route {
  static queries = {
    channel: (Component) => Relay.QL`
      query {
        node(id: $channelId) {
          ${Component.getFragment('channel')},
        },
      }
    `
  };

  static paramDefinitions = {
    channelId: {required: true},
  }

  static routeName = 'ChannelRoute';
}
