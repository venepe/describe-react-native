'use strict';

import React, { Component, PropTypes } from 'react';
import { Alert, ScrollView, ToolbarAndroid, View } from 'react-native';
import Relay from 'react-relay';
import ContactForm from '../ContactForm';
const validator = require('validator');
import { Common } from '../../styles';
import SMTIAnalytics from '../../lib/SMTIAnalytics';

import { IntroduceContactMutation } from '../../mutations';

class ContactFormView extends Component {
  constructor(props) {
    super(props);
    this._onCreate = this._onCreate.bind(this);
    this._onActionSelected = this._onActionSelected.bind(this);
    this._onChangeEmail = this._onChangeEmail.bind(this);

    this.state = {
      isDisabled: true,
      email: '',
    }
  }

  _onActionSelected(position) {
    if (position === 0) {
      this._onCreate();
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
        <ToolbarAndroid title='Add Contact' titleColor='#FFFFFF' style={{backgroundColor: '#607d8b', height: 56,}} actions={[{title: 'Add', icon: require('image!ic_check'), show: 'always'}]} onActionSelected={this._onActionSelected}/>
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
