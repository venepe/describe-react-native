'use strict';

import React, { Component, PropTypes } from 'react';
import { Alert, Image, StyleSheet, Text, View } from 'react-native';
import Relay from 'react-relay';
import TouchableText from '../TouchableText';
import CollaboratorIcon from '../CollaboratorIcon';
import { Common } from '../../styles';

import { AcceptInvitationMutation, DeclineInvitationMutation } from '../../mutations';

import { registerDidAcceptInvitation, registerDidDeclineInvitation } from '../../stores/SubscriptionStore';
import { DidAcceptInvitationSubscription, DidDeclineInvitationSubscription } from '../../subscriptions';

class InvitationListCellView extends Component {
  static propTypes = {
    key: PropTypes.number
  }

  static defaultProps = {
    key: 0
  }

  constructor(props) {
    super(props);
    this._onAccept = this._onAccept.bind(this);
    this._onDecline = this._onDecline.bind(this);
    this.renderBuiltWith = this.renderBuiltWith.bind(this);
  }

  _onAccept() {
    Relay.Store.commitUpdate(
      new AcceptInvitationMutation({invitation: this.props.invitation, me: this.props.me})
    );
  }

  _onDecline() {
    Alert.alert(
      'Decline Invitation?',
      'Do you wish to continue?',
      [
        {text: 'Cancel'},
        {text: 'Yes', onPress: () => {
          Relay.Store.commitUpdate(
            new DeclineInvitationMutation({invitation: this.props.invitation, me: this.props.me})
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
    if (this.props.invitation && this.props.me) {
      let invitation = this.props.invitation;
      let me = this.props.me;
      let invitationId = invitation.id;
      let meId = me.id;

      registerDidAcceptInvitation({invitationId, meId}, () => {
        return Relay.Store.subscribe(
          new DidAcceptInvitationSubscription({invitation, me})
        );
      });
      registerDidDeclineInvitation({invitationId, meId}, () => {
        return Relay.Store.subscribe(
          new DidDeclineInvitationSubscription({invitation, me})
        );
      });
    }
  }

  renderBuiltWith() {
    let invitation = this.props.invitation;
    let project = invitation.project;
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
    let invitation = this.props.invitation;
    let project = invitation.project;
    let percentFulfilled = parseInt(project.numOfTestCasesFulfilled / project.numOfTestCases * 100) || 0;
    let color = percentFulfilled < 50 ? '#FF5252' : percentFulfilled < 80 ? '#FFD740' : '#69F0AE';

    return (
      <View style={Common.card}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{invitation.project.text}</Text>
          <View style={styles.subtitleContainer}>
            <Text style={styles.subtitle}>{project.numOfTestCasesFulfilled}/{project.numOfTestCases}</Text>
            {this.renderBuiltWith()}
            <View style={styles.rightContainer}>
              <View style={styles.btnContainer}>
                <TouchableText style={[styles.btn, {marginRight: 5}]} text={'DECLINE'} onPress={this._onDecline}></TouchableText>
                <TouchableText style={[styles.btn]} text={'ACCEPT'} onPress={this._onAccept}></TouchableText>
              </View>
            </View>
          </View>
        </View>
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
  btn: {
    color: '#FFC107',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Roboto',
    margin: 2,
  },
  btnContainer: {
    flexDirection: 'row',
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

export default Relay.createContainer(InvitationListCellView, {
  fragments: {
    invitation: () => Relay.QL`
      fragment on Invitation {
        id
        project {
          id
          text
          numOfTestCases
          numOfTestCasesFulfilled
          collaborators (first: 5) {
            edges {
              node {
                ${CollaboratorIcon.getFragment('collaborator')},
              }
            }
          }
          ${CollaboratorIcon.getFragment('project')},
        }
        sponsor {
          id
          name
          cover {
            id
            uri
          }
        }
        ${AcceptInvitationMutation.getFragment('invitation')},
        ${DeclineInvitationMutation.getFragment('invitation')},
        ${DidAcceptInvitationSubscription.getFragment('invitation')},
        ${DidDeclineInvitationSubscription.getFragment('invitation')},
      }
    `,
    me: () => Relay.QL`
      fragment on User {
        id
        ${AcceptInvitationMutation.getFragment('me')},
        ${DeclineInvitationMutation.getFragment('me')},
        ${DidAcceptInvitationSubscription.getFragment('me')},
        ${DidDeclineInvitationSubscription.getFragment('me')},
      }
    `,
  },
});
