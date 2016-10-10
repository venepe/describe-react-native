'use strict';

import Relay from 'react-relay';

export default class UpdateTestCaseMutation extends Relay.Mutation {
  static fragments = {
    testCase: () => Relay.QL`
      fragment on TestCase {
        id,
      }
    `,
  };
  getMutation() {
    return Relay.QL`mutation{updateTestCase}`;
  }
  getFatQuery() {
    return Relay.QL`
      fragment on UpdateTestCasePayload {
        testCase {
          text
        }
        testCaseEventEdge {
          node {
            id
            text
          }
        }
      }
    `;
  }
  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        testCase: this.props.testCase.id,
      }
    },
    {
      type: 'RANGE_ADD',
      parentName: 'testCase',
      parentID: this.props.testCase.id,
      connectionName: 'events',
      edgeName: 'testCaseEventEdge',
      rangeBehaviors: {
        '': 'append',
      }
    },
  ];
  }
  getVariables() {
    return {
      id: this.props.testCase.id,
      text: this.props.text,
    };
  }
  getOptimisticResponse() {
    return {
      testCase: {
        id: this.props.testCase.id,
        text: this.props.text,
      },
      testCaseEventEdge: {
        node: {
          text: this.props.text,
        }
      }
    };
  }
}
