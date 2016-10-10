'use strict';

import React, { Component, PropTypes } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Relay from 'react-relay';
import Autocomplete from 'react-native-autocomplete-input';
import { Common } from '../../styles';
import { getCollaboratorPlaceholderText } from '../../lib/utilities';
import InviteeFormCellView from '../InviteeFormCellView';

import { registerDidIntroduceContact } from '../../stores/SubscriptionStore';
import { DidIntroduceContactSubscription } from '../../subscriptions';

const _first = 30;

class InviteeForm extends Component {
  static propTypes = {
    onChangeEmail: PropTypes.func,
    email: PropTypes.string,
  }

  static defaultProps = {
    onChangeEmail: function() {},
    email: '',
  }

  constructor(props) {
    super(props);
    this._onChangeEmail = this._onChangeEmail.bind(this);
    this._findContact = this._findContact.bind(this);

    this.state = {
      email: props.email,
      placeholder: getCollaboratorPlaceholderText()
    }
  }

  _onChangeEmail(email) {
    this.setState({email});
    this.props.onChangeEmail(email);
  }

  _findContact(query) {
    if (query === '') {
      return [];
    }

    const edges = this.props.me.contacts.edges;
    const regex = new RegExp(`${query.trim()}`, 'i');
    return edges.filter(edge => edge.node.email.search(regex) >= 0);
  }

  componentDidMount() {
    this.subscribe();
  }

  componentDidUpdate() {
    this.subscribe();
  }

  subscribe() {
    if (this.props.me) {
      let me = this.props.me;
      let meId = me.id;

      registerDidIntroduceContact({meId}, () => {
        return Relay.Store.subscribe(
          new DidIntroduceContactSubscription({me})
        );
      });
    }
  }

  render() {
    const { email } = this.state;
    const contacts = this._findContact(email);
    const comp = (s, s2) => s.toLowerCase().trim() === s2.toLowerCase().trim();

    return (
      <View style={[{flex: 1, padding: 10}]}>
        <Text style={styles.textLabel}>Email</Text>
        <Autocomplete
          autoCapitalize={'none'}
          autoCorrect={false}
          autoFocus={true}
          keyboardType={'email-address'}
          returnKeyType={'done'}
          maxLength={150}
          style={styles.textbox}
          inputContainerStyle={styles.inputContainerStyle}
          containerStyle={[styles.containerStyle]}
          listStyle={styles.listStyle}
          data={contacts.length === 1 && comp(email, contacts[0].node.email) ? [] : contacts}
          defaultValue={this.state.email}
          onChangeText={this._onChangeEmail}
          placeholder={this.state.placeholder}
          renderItem={data => (
            <InviteeFormCellView contact={data.node} me={this.props.me} onPress={() => this._onChangeEmail(data.node.email)} />
          )}
        />
    </View>
    );
  }
}

const styles = StyleSheet.create({
  maxContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  containerStyle: {
    flex: 1
  },
  inputContainerStyle: {
    borderColor: 'transparent',
    margin: 0,
  },
  listStyle: {
    borderColor: 'transparent',
    margin: 0,
  },
  textboxContainer: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: 'white'
  },
  textLabel: {
    fontSize: 18,
    color: '#212121',
    fontWeight: '300',
    fontFamily: 'Roboto',
  },
  textbox: {
    height: 36, // 36
    fontSize: 17, // 25
    color: '#212121',
    fontWeight: '300', //500
    fontFamily: 'Roboto',
  },
});

export default Relay.createContainer(InviteeForm, {
  initialVariables: {
    first: _first,
    after: null,
    moreFirst: _first
  },
  fragments: {
    me: () => Relay.QL`
      fragment on User {
        id
        contacts (first: $first) {
          pageInfo {
            hasNextPage
          }
          edges {
            cursor
            node {
              email
              ${InviteeFormCellView.getFragment('contact')},
            }
          }
        }
        ${DidIntroduceContactSubscription.getFragment('me')},
      }
    `,
  },
});
