'use strict';

import Relay from 'react-relay';

export default class UpdateFulfillmentMutation extends Relay.Mutation {
  static fragments = {
    fulfillment: () => Relay.QL`
      fragment on Fulfillment {
        id
        status
        uri
      }
    `,
    testCase: () => Relay.QL`
      fragment on TestCase {
        id
      }
    `,
    project: () => Relay.QL`
      fragment on Project {
        id
        numOfTestCasesFulfilled
      }
    `,
  };
  getMutation() {
    return Relay.QL`mutation{updateFulfillment}`;
  }
  getFatQuery() {
    return Relay.QL`
      fragment on UpdateFulfillmentPayload {
        fulfillment {
          id
          status
          uri
        }
        fulfillmentEventEdge {
          cursor
          node {
            id
            status
            uri
          }
        }
        testCase
        project {
          numOfTestCasesFulfilled
        }
      }
    `;
  }
  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        fulfillment: this.props.fulfillment.id,
      }
    },
    {
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        testCase: this.props.testCase.id,
      }
    },
    {
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        project: this.props.project.id,
      }
    },
    {
      type: 'RANGE_ADD',
      parentName: 'fulfillment',
      parentID: this.props.fulfillment.id,
      connectionName: 'events',
      edgeName: 'fulfillmentEventEdge',
      rangeBehaviors: {
        '': 'prepend',
      }
    }
  ];
  }
  getFiles() {
    if (this.props.uri) {
      return [
        this.props.uri
      ];
    } else {
      return [];
    }
  }
  getVariables() {
    return {
      id: this.props.fulfillment.id,
      testCaseId: this.props.testCase.id,
      uri: this.props.uri || this.props.fulfillment.uri,
      status: this.props.status,
    };
  }
  getOptimisticResponse() {
    let status = this.props.status || this.props.fulfillment.status;
    let uri = this.props.fulfillment.uri;
    let numOfTestCasesFulfilled = this.props.project.numOfTestCasesFulfilled;
    if (this.props.status !== this.props.fulfillment.status) {
      if (this.props.status === 'SUBMITTED') {
        numOfTestCasesFulfilled++;
      } else {
        numOfTestCasesFulfilled--;
      }
    }
    return {
      fulfillment: {
        id: this.props.fulfillment.id,
        uri,
        status
      },
      fulfillmentEventEdge: {
        node: {
          uri,
          status
        }
      },
      testCase: {
        id: this.props.testCase.id,
        status
      },
      project: {
        id: this.props.project.id,
        numOfTestCasesFulfilled
      }
    };
  }
}
