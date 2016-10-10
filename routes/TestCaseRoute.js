'use strict';

import Relay from 'react-relay';

export default class TestCaseRoute extends Relay.Route {
  static queries = {
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
    testCaseId: {required: true},
  }

  static routeName = 'TestCaseRoute';
}
