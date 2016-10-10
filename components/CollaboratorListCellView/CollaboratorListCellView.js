'use strict';

import React, { Component, PropTypes } from 'react';
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Relay from 'react-relay';
import Swipeout from 'react-native-swipeout';
import { Common } from '../../styles';
import { DeleteCollaboratorMutation } from '../../mutations';
import { registerDidDeleteCollaborator } from '../../stores/SubscriptionStore';
import { DidDeleteCollaboratorSubscription } from '../../subscriptions';
import { hasDeleteNodePerm } from '../../lib/permissions';

class CollaboratorListCellView extends Component {
  static propTypes = {
    key: PropTypes.number,
    onPress: PropTypes.func
  }

  static defaultProps = {
    key: 0,
    onPress: function() {}
  }

  constructor(props) {
    super(props);
    this.deleteCollaborator = this.deleteCollaborator.bind(this);
  }

  deleteCollaborator() {
    Alert.alert(
      'Delete Collaborator?',
      'Do you wish to continue?',
      [
        {text: 'Cancel'},
        {text: 'Yes', onPress: () => {
          Relay.Store.commitUpdate(
            new DeleteCollaboratorMutation({collaborator: this.props.collaborator, project: this.props.project})
          );
        }},
      ]
      )
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
    let profile = collaborator.profile;

    let right = [];
    if (hasDeleteNodePerm(collaborator.permission)) {
      right = [
        { text: 'Cancel', color: '#FFFFFF', backgroundColor: '#9E9E9E' },
        { text: 'Delete', color: '#FFFFFF', backgroundColor: '#FF5252', onPress: this.deleteCollaborator },
      ];
    }

    return (
      <View>
        <Swipeout right={right} autoClose={true}>
          <TouchableOpacity onPress={() => this.props.onPress(collaborator)}>
            <View style={[Common.card, styles.cell]}>
              <Image style={styles.image} source={{uri: profile.cover.uri}} />
              <View style={[styles.collaborator]}>
                <Text style={styles.name}>{profile.name}</Text>
                <Text style={styles.role}>{collaborator.role}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </Swipeout>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cell: {
    flexDirection: 'row',
    padding: 15,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E0E0E0',
    overlayColor: 'white'
  },
  collaborator: {
    flexDirection: 'column',
    margin: 5,
  },
  name: {
    color: '#212121',
    fontSize: 18,
    fontWeight: '400',
    fontFamily: 'Roboto',
  },
  role: {
    color: '#212121',
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Roboto',
  },
  rightButton: {
    position: 'absolute',
    right: 15,
    margin: 5,
  },
});

export default Relay.createContainer(CollaboratorListCellView, {
  fragments: {
    collaborator: () => Relay.QL`
      fragment on Collaborator {
        id
        role
        permission
        profile {
          id
          name
          cover {
            id
            uri
          }
        }
        ${DeleteCollaboratorMutation.getFragment('collaborator')},
        ${DidDeleteCollaboratorSubscription.getFragment('collaborator')},
      }
    `,
    project: () => Relay.QL`
      fragment on Project {
        ${DeleteCollaboratorMutation.getFragment('project')},
        ${DidDeleteCollaboratorSubscription.getFragment('project')},
      }
    `,
  },
});
