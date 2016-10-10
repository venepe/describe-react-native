'use strict';

import React, { Component, PropTypes } from 'react';
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Relay from 'react-relay';
import Swipeout from 'react-native-swipeout';
import { Common } from '../../styles';
import { DeleteContactMutation } from '../../mutations';

class ContactListCellView extends Component {
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
    this.deleteContact = this.deleteContact.bind(this);
  }

  deleteContact() {
    Alert.alert(
      'Delete Contact?',
      'Do you wish to continue?',
      [
        {text: 'Cancel'},
        {text: 'Yes', onPress: () => {
          Relay.Store.commitUpdate(
            new DeleteContactMutation({contact: this.props.contact, me: this.props.me})
          );
        }},
      ]
      )
  }

  render() {
    let contact = this.props.contact;

    let right = [
      { text: 'Cancel', color: '#FFFFFF', backgroundColor: '#9E9E9E' },
      { text: 'Delete', color: '#FFFFFF', backgroundColor: '#FF5252', onPress: this.deleteContact },
    ];

    return (
      <View>
        <Swipeout right={right} autoClose={true}>
        <TouchableOpacity onPress={() => this.props.onPress(contact)}>
          <View style={[Common.card, styles.cell]}>
            <Image style={styles.image} source={{uri: contact.cover.uri}} />
            <View style={[styles.contact]}>
              <Text style={styles.name}>{contact.name}</Text>
              <Text style={styles.role}>{contact.email}</Text>
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
    overlayColor: 'white',
  },
  contact: {
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

export default Relay.createContainer(ContactListCellView, {
  fragments: {
    contact: () => Relay.QL`
      fragment on User {
        id
        name
        email
        cover {
          id
          uri
        }
        ${DeleteContactMutation.getFragment('contact')},
      }
    `,
    me: () => Relay.QL`
      fragment on User {
        ${DeleteContactMutation.getFragment('me')},
      }
    `,
  },
});
