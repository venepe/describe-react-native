'use strict';

import React, { Component } from 'react';
import { InteractionManager, Navigator, View } from 'react-native';
import Relay from 'react-relay';
import InvitationListView from '../InvitationListView';
import MyInvitationsPlaceholder from '../MyInvitationsPlaceholder';
const _first = 10;
const _next = 10;

import { registerDidIntroduceInvitation } from '../../stores/SubscriptionStore';
import { DidIntroduceInvitationSubscription } from '../../subscriptions';

class MyInvitationsView extends Component {
  constructor(props) {
    super(props);
    this._onEndReached = this._onEndReached.bind(this);
  }

  _onEndReached(cursor) {
    let first = this.props.relay.variables.first;
    this.props.relay.setVariables({
      first: first + _next,
      after: cursor
    });
  }

  componentDidMount() {
    this.subscribe();
  }

  componentDidUpdate() {
    this.subscribe();
  }

  subscribe() {
    if (this.props.me) {
      let me = this.props.me || {};
      let meId = me.id || '';

      registerDidIntroduceInvitation({meId}, () => {
        return Relay.Store.subscribe(
          new DidIntroduceInvitationSubscription({me})
        );
      });
    }
  }


  render() {

    if(this.props.me) {
      let me = this.props.me
      if (me.originalInvitations.edges.length > 0)  {
        return (
          <View style={{flex: 1}}>
            <InvitationListView invitations={this.props.me.originalInvitations} me={this.props.me} navigator={this.props.navigator} onPressRow={this._onPressRow} onEndReached={this._onEndReached}/>
          </View>
        );
      } else {
        return this._renderPlaceholderView();
      }
    } else {
      return (
        <View></View>
      );
    }
  }

  _renderPlaceholderView() {
    return (
      <View style={{flex: 1}}>
        <MyInvitationsPlaceholder />
      </View>
    );
  }
}

export default Relay.createContainer(MyInvitationsView, {
  initialVariables: {
    first: _first,
    after: null,
    moreFirst: _first
  },
  fragments: {
    me: () => Relay.QL`
    fragment on User {
      id
      originalInvitations: invitations(first: $first) {
        edges
        ${InvitationListView.getFragment('invitations')},
      }
      moreInvitations: invitations(first: $moreFirst, after: $after) {
        ${InvitationListView.getFragment('invitations')},
      }
      ${DidIntroduceInvitationSubscription.getFragment('me')},
      ${InvitationListView.getFragment('me')},
    }
    `,
  },
});
