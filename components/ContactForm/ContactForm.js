'use strict';

import React, { Component, PropTypes } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Common } from '../../styles';
import { getCollaboratorPlaceholderText } from '../../lib/utilities';

class ContactForm extends Component {
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

    this.state = {
      email: props.email,
      placeholder: getCollaboratorPlaceholderText()
    }
  }

  _onChangeEmail(email) {
    this.setState({email});
    this.props.onChangeEmail(email);
  }

  render() {

    return (
        <View style={[styles.maxContainer]}>
          <ScrollView backgroundColor={'#FFFFFF'} keyboardShouldPersistTaps={false}>
            <View style={[Common.card, {flex: 1, padding: 10}]}>
              <Text style={styles.textLabel}>Email</Text>
              <TextInput autoFocus={true} style={styles.textbox} placeholder={this.state.placeholder} onChangeText={this._onChangeEmail}
                 value={this.state.email} keyboardType={'email-address'} returnKeyType={'done'} maxLength={150} autoCapitalize={'none'} />
            </View>
          </ScrollView>
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
  textboxContainer: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: 'white',
  },
  textLabel: {
    fontSize: 18,
    color: '#212121',
    fontWeight: '300',
    fontFamily: 'Roboto',
  },
  textbox: {
    height: 36,
    fontSize: 17,
    color: '#212121',
    fontWeight: '300',
    fontFamily: 'Roboto',
  },
});

export default ContactForm;
