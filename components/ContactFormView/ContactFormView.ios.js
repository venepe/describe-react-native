'use strict';

import React, { Component, PropTypes } from 'react';
import { Alert, ScrollView, View } from 'react-native';
import Relay from 'react-relay';
import NavigationBar from 'react-native-navbar';
import ContactForm from '../ContactForm';
const validator = require('validator');
import { Common } from '../../styles';
import CloseNavigationButton from '../CloseNavigationButton';
import CheckNavigationButton from '../CheckNavigationButton';
import SMTIAnalytics from '../../lib/SMTIAnalytics';

import { IntroduceContactMutation } from '../../mutations';

class ContactFormView extends Component {
  constructor(props) {
    super(props);
    this._onCreate = this._onCreate.bind(this);
    this._closeModal = this._closeModal.bind(this);
    this._onChangeEmail = this._onChangeEmail.bind(this);

    this.state = {
      isDisabled: true,
      email: '',
    }
  }

  _onCreate() {
    let email = this.state.email;
    let isDisabled = this.state.isDisabled;
    if (!isDisabled) {
      this.setState({
        isDisabled: true
      });

      let onSuccess = () => {
        // Start SMTIAnalytics
        SMTIAnalytics.track(SMTIAnalytics.Events.ADDED_CONTACT);
        // End SMTIAnalytics

        this.props.navigator.pop();
      }

      let onFailure = () => {
        Alert.alert(
          'Unable to add contact',
          'Verify the email address is correct.',
          [
            {text: 'Okay'},
          ]
        );
      };

      let mutation = new IntroduceContactMutation({email, me: this.props.me});

      Relay.Store.commitUpdate(mutation, {onFailure, onSuccess});

    }

  }

  _closeModal() {
    this.props.navigator.pop();
  }

  _onChangeEmail(email) {
    let isDisabled = true;
    if (validator.isEmail(email)) {
      isDisabled = false;
    }

    this.setState({
      email,
      isDisabled,
    });
  }

  render() {

    return (
      <View style={{flex: 1}}>
        <NavigationBar title={{title: 'Add Contact', tintColor: '#373e4d'}} leftButton={<CloseNavigationButton side={'left'} onPress={this._closeModal}/>} rightButton={<CheckNavigationButton isDisabled={this.state.isDisabled} onPress={this._onCreate}/>} />
        <ContactForm onChangeEmail={this._onChangeEmail} />
      </View>
    );
  }
}

export default Relay.createContainer(ContactFormView, {
  fragments: {
    me: () => Relay.QL`
      fragment on User {
        ${IntroduceContactMutation.getFragment('me')}
      }
    `,
  },
});
