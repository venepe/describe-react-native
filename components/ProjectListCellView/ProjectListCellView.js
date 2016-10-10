'use strict';

import React, { Component, PropTypes } from 'react';
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Relay from 'react-relay';
import Swipeout from 'react-native-swipeout';
import CollaboratorIcon from '../CollaboratorIcon';
import { Common } from '../../styles';
import { hasDeleteNodePerm } from '../../lib/permissions';

import { DeleteProjectMutation, LeaveProjectMutation } from '../../mutations';
import { registerDidIntroduceCollaborator, registerDidDeleteProject, registerDidUpdateProject } from '../../stores/SubscriptionStore';
import { DidIntroduceCollaboratorSubscription, DidDeleteProjectSubscription, DidUpdateProjectSubscription } from '../../subscriptions';

class ProjectListCellView extends Component {
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
    this.renderBuiltWith = this.renderBuiltWith.bind(this);
    this.deleteProject = this.deleteProject.bind(this);
    this.leaveProject = this.leaveProject.bind(this);
  }

  componentDidMount() {
    this.subscribe();
  }

  componentDidUpdate() {
    this.subscribe();
  }

  deleteProject() {
    Alert.alert(
      'Delete Event?',
      'Do you wish to continue?',
      [
        {text: 'Cancel'},
        {text: 'Yes', onPress: () => {
          Relay.Store.commitUpdate(
            new DeleteProjectMutation({project: this.props.project, me: this.props.me})
          );
        }},
      ]
      )
  }



  leaveProject() {
    Alert.alert(
      'Leave Event?',
      'Do you wish to continue?',
      [
        {text: 'Cancel'},
        {text: 'Yes', onPress: () => {
          Relay.Store.commitUpdate(
            new LeaveProjectMutation({project: this.props.project, me: this.props.me})
          );
        }},
      ]
      )
  }

  subscribe() {
    if (this.props.project && this.props.me) {
      let project = this.props.project;
      let me = this.props.me;
      let projectId = project.id;
      let meId = me.id;

      registerDidIntroduceCollaborator({projectId}, () => {
        return Relay.Store.subscribe(
          new DidIntroduceCollaboratorSubscription({project})
        );
      });
      registerDidUpdateProject({projectId}, () => {
        return Relay.Store.subscribe(
          new DidUpdateProjectSubscription({project})
        );
      });
      registerDidDeleteProject({projectId, meId}, () => {
        return Relay.Store.subscribe(
          new DidDeleteProjectSubscription({project, me})
        );
      });
    }
  }

  renderBuiltWith() {
    let project = this.props.project;
    if (project.collaborators && project.collaborators.edges.length > 0) {
      return project.collaborators.edges.map(function (object, index) {
        let collaborator = object.node || {};
        return(<CollaboratorIcon key={index} style={styles.image} collaborator={collaborator} project={project} />)
      });
    } else {
      return;
    }
  }

  render() {
    let project = this.props.project;
    let right = [];
    if (hasDeleteNodePerm(project.permission)) {
      right = [
        { text: 'Cancel', color: '#FFFFFF', backgroundColor: '#9E9E9E' },
        { text: 'Delete', color: '#FFFFFF', backgroundColor: '#FF5252', onPress: this.deleteProject },
      ];
    } else {
      right = [
        { text: 'Cancel', color: '#FFFFFF', backgroundColor: '#9E9E9E' },
        { text: 'Leave', color: '#FFFFFF', backgroundColor: '#FF5252', onPress: this.leaveProject },
      ];
    }

    let percentFulfilled = parseInt(project.numOfTestCasesFulfilled / project.numOfTestCases * 100) || 0;
    let color = percentFulfilled < 50 ? '#FF5252' : percentFulfilled < 80 ? '#FFD740' : '#69F0AE';
    return (
      <View>
        <Swipeout right={right} autoClose={true}>
          <TouchableOpacity onPress={() => this.props.onPress(project)}>
            <View style={Common.card}>
              <View style={styles.titleContainer}>
                <View style={styles.subtitleContainer}>
                  <Text style={styles.subtitle}>{project.numOfTestCasesFulfilled}/{project.numOfTestCases}</Text>
                  {this.renderBuiltWith()}
                  <View style={styles.rightContainer}>
                    <Text style={[styles.right, {color}]}>{percentFulfilled}%</Text>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </Swipeout>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    color: '#212121',
    fontSize: 24,
    fontWeight: '400',
    fontFamily: 'Roboto',
  },
  titleContainer: {
    margin: 15
  },
  subtitleContainer: {
    flexDirection: 'row',
    marginTop: 5
  },
  subtitle: {
    color: '#9e9e9e',
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Roboto',
  },
  rightContainer: {
    position: 'absolute',
    right: 0
  },
  right: {
    color: '#9e9e9e',
    fontSize: 18,
    fontWeight: '400',
    fontFamily: 'Roboto',
  },
  image: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginLeft: 5,
    marginTop: -2,
    backgroundColor: '#E0E0E0',
    overlayColor: 'white'
  },
});

export default Relay.createContainer(ProjectListCellView, {
  fragments: {
    project: () => Relay.QL`
      fragment on Project {
        id
        text
        numOfTestCases
        numOfTestCasesFulfilled
        permission
        collaborators (first: 5) {
          edges {
            node {
              ${CollaboratorIcon.getFragment('collaborator')},
            }
          }
        }
        ${CollaboratorIcon.getFragment('project')},
        ${DeleteProjectMutation.getFragment('project')},
        ${LeaveProjectMutation.getFragment('project')},
        ${DidDeleteProjectSubscription.getFragment('project')},
        ${DidUpdateProjectSubscription.getFragment('project')},
        ${DidIntroduceCollaboratorSubscription.getFragment('project')},
      }
    `,
    me: () => Relay.QL`
      fragment on User {
        ${DeleteProjectMutation.getFragment('me')},
        ${LeaveProjectMutation.getFragment('me')},
        ${DidDeleteProjectSubscription.getFragment('me')},
      }
    `,
  },
});
