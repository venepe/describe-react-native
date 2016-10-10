'use strict';

import Relay from 'react-relay';

export default class NodeRoute extends Relay.Route {
  static queries = {
    target: (Component) => Relay.QL`
      query {
        node(id: $targetId) {
          ${Component.getFragment('target')},
        },
      }
    `,
  };

  static paramDefinitions = {
    targetId: {required: true},
  }

  static routeName = 'NodeRoute';
}
