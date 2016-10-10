'use strict';

import Relay from 'react-relay';

export default class FulfillmentRoute extends Relay.Route {
  static queries = {
    fulfillment: (Component) => Relay.QL`
      query {
        node(id: $fulfillmentId) {
          ${Component.getFragment('fulfillment')},
        },
      }
    `,
    testCase: (Component) => Relay.QL`
      query {
        node(id: $testCaseId) {
          ${Component.getFragment('testCase')},
        },
      }
    `,
    project: (Component) => Relay.QL`
      query {
        node(id: $projectId) {
          ${Component.getFragment('project')},
        },
      }
    `,
  };

  static paramDefinitions = {
    fulfillmentId: {required: true},
  }

  static routeName = 'FulfillmentRoute';
}
