'use strict';

import Relay from 'react-relay';

export default class IntroduceProjectMutation extends Relay.Mutation {
  static fragments = {
    me: () => Relay.QL`
      fragment on User {
        id
      }
    `,
  };
  getMutation() {
    return Relay.QL`mutation{introduceProject}`;
  }
  getFatQuery() {
    return Relay.QL`
      fragment on IntroduceProjectPayload {
        projectEdge {
          node {
            id
            text
            numOfTestCases
            numOfTestCasesFulfilled
            permission
          }
        }
        me {
          projects
        },
      }
    `;
  }
  getConfigs() {
    return [{
      type: 'RANGE_ADD',
      parentName: 'me',
      parentID: this.props.me.id,
      connectionName: 'projects',
      edgeName: 'projectEdge',
      rangeBehaviors: {
        '': 'prepend',
      },
    }];
  }
  getVariables() {
    return {
      targetId: this.props.me.id,
      text: this.props.text,
    };
  }
  getOptimisticResponse() {
    return {
      projectEdge: {
        node: {
          text: this.props.text,
          numOfTestCases: 0,
          numOfTestCasesFulfilled: 0,
          permission: 15,
        },
      },
    };
  }
}
