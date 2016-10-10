'use strict';

import React, { Component, PropTypes } from 'react';
import { Image } from 'react-native';
import Relay from 'react-relay';

import { registerDidDeleteCollaborator } from '../../stores/SubscriptionStore';
import { DidDeleteCollaboratorSubscription } from '../../subscriptions';

class CollaboratorIcon extends Component {
  static defaultProps = {
    style: {}
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.subscribe();
  }

  componentDidUpdate() {
    this.subscribe();
  }

  subscribe() {
    if (this.props.collaborator && this.props.project) {
      let collaborator = this.props.collaborator;
      let project = this.props.project;
      let collaboratorId = collaborator.id;
      let projectId = project.id;

      registerDidDeleteCollaborator({collaboratorId, projectId}, () => {
        return Relay.Store.subscribe(
          new DidDeleteCollaboratorSubscription({collaborator, project})
        );
      });
    }
  }

  render() {
    let collaborator = this.props.collaborator;
    let profile = collaborator.profile || {};
    let cover = profile.cover || {};

    return(
      <Image style={this.props.style} source={{uri: cover.uri}} />
    );
  }
}

export default Relay.createContainer(CollaboratorIcon, {
  fragments: {
    collaborator: () => Relay.QL`
      fragment on Collaborator {
        id
        role
        profile {
          id
          name
          cover {
            id
            uri
          }
        }
        ${DidDeleteCollaboratorSubscription.getFragment('collaborator')},
      }
    `,
    project: () => Relay.QL`
      fragment on Project {
        ${DidDeleteCollaboratorSubscription.getFragment('project')},
      }
    `,
  },
});
