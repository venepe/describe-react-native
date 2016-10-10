'use strict';

import React, { Component, PropTypes } from 'react';
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Relay from 'react-relay';
import Swipeout from 'react-native-swipeout';
import { Common } from '../../styles';

import { DeleteInviteeMutation } from '../../mutations';
import { registerDidDeleteInvitee } from '../../stores/SubscriptionStore';
import { DidDeleteInviteeSubscription } from '../../subscriptions';

class InviteeListCellView extends Component {
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
    this.deleteInvitee = this.deleteInvitee.bind(this);
  }

  deleteInvitee() {
    Alert.alert(
      'Delete Invitation?',
      'Do you wish to continue?',
      [
        {text: 'Cancel'},
        {text: 'Yes', onPress: () => {
          Relay.Store.commitUpdate(
            new DeleteInviteeMutation({invitee: this.props.invitee, project: this.props.project})
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
    if (this.props.invitee && this.props.project) {
      let invitee = this.props.invitee;
      let project = this.props.project;
      let inviteeId = invitee.id;
      let projectId = project.id;

      registerDidDeleteInvitee({inviteeId, projectId}, () => {
        return Relay.Store.subscribe(
          new DidDeleteInviteeSubscription({invitee, project})
        );
      });
    }
  }

  render() {
    let invitee = this.props.invitee;
    let profile = invitee.profile;

    let right = [];
    if (this.props.invitee.role !== 'AUTHOR') {
      right = [
        { text: 'Cancel', color: '#FFFFFF', backgroundColor: '#9E9E9E' },
        { text: 'Delete', color: '#FFFFFF', backgroundColor: '#FF5252', onPress: this.deleteInvitee },
      ];
    }

    return (
      <View>
        <Swipeout right={right} autoClose={true}>
          <TouchableOpacity onPress={() => this.props.onPress(invitee)}>
            <View style={[Common.card, styles.cell]}>
              <Image style={styles.image} source={{uri: profile.cover.uri}} />
              <View style={[styles.invitee]}>
                <Text style={styles.name}>{profile.name}</Text>
                <Text style={styles.role}>{invitee.role}</Text>
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
  invitee: {
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

export default Relay.createContainer(InviteeListCellView, {
  fragments: {
    invitee: () => Relay.QL`
      fragment on Invitee {
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
        ${DeleteInviteeMutation.getFragment('invitee')},
        ${DidDeleteInviteeSubscription.getFragment('invitee')},
      }
    `,
    project: () => Relay.QL`
      fragment on Project {
        ${DeleteInviteeMutation.getFragment('project')},
        ${DidDeleteInviteeSubscription.getFragment('project')},
      }
    `,
  },
});
