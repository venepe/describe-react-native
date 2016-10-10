'use strict';

import Relay from 'react-relay';

export default class DidDeleteTestCaseSubscription extends Relay.Subscription {
  static fragments = {
    testCase: () => Relay.QL`
      fragment on TestCase {
        id
      }
    `,
    project: () => Relay.QL`
      fragment on Project {
        id
      }
    `,
  };
  getSubscription() {
    return Relay.QL`
      subscription {
        didDeleteTestCase (input: $didDeleteTestCase) {
          deletedTestCaseId,
          project {
            id
            numOfTestCases
            numOfTestCasesFulfilled
          },
        }
      }`;
  }
  getConfigs() {
    return [{
      type: 'NODE_DELETE',
      parentName: 'project',
      parentID: this.props.project.id,
      connectionName: 'testCases',
      deletedIDFieldName: 'deletedTestCaseId',
      }];
  }
  getVariables() {
    return {
      id: this.props.testCase.id,
    };
  }
}
