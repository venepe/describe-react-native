'use strict';

import Relay from 'react-relay';

export default class DeleteTestCaseMutation extends Relay.Mutation {
  static fragments = {
    testCase: () => Relay.QL`
      fragment on TestCase {
        id
        status
      }
    `,
    project: () => Relay.QL`
      fragment on Project {
        id
        numOfTestCases
        numOfTestCasesFulfilled
      }
    `,
  };
  getMutation() {
    return Relay.QL`mutation{deleteTestCase}`;
  }
  getFatQuery() {
    return Relay.QL`
      fragment on DeleteTestCasePayload {
        deletedTestCaseId,
        project {
          numOfTestCases
          numOfTestCasesFulfilled
          testCases
        },
      }
    `;
  }
  getConfigs() {
    return [{
      type: 'NODE_DELETE',
      parentName: 'project',
      parentID: this.props.project.id,
      connectionName: 'testCases',
      deletedIDFieldName: 'deletedTestCaseId',
      },
      {
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        project: this.props.project.id,
      },
    }];
  }
  getVariables() {
    return {
      id: this.props.testCase.id,
    };
  }
  getOptimisticResponse() {
    let numOfTestCases = this.props.project.numOfTestCases;
    let numOfTestCasesFulfilled = this.props.project.numOfTestCasesFulfilled;
    numOfTestCases--;
    if (this.props.testCase.status === 'SUBMITTED') {
      numOfTestCasesFulfilled--;
    }
    return {
      deletedTestCaseId: this.props.testCase.id,
      project: {
        id: this.props.project.id,
        numOfTestCases,
        numOfTestCasesFulfilled
      }
    };
  }
}
