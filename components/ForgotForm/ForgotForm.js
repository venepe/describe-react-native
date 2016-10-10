'use strict';

import React, { Component, PropTypes } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
const validator = require('validator');
import SMTINavigationBar from '../SMTINavigationBar';
import CloseNavigationButton from '../CloseNavigationButton';
import InputView from '../InputView';
import DefaultButton from '../DefaultButton';
import SpinnerButton from '../SpinnerButton';
import Authenticate from '../../lib/authenticate';
import { Common } from '../../styles';
const serverErrorMsg = 'Invalid email. Please try again';
const emailErrorMsg = 'Place enter a valid email address.';
const btnDisabledColor = '#FCE4EC';
const btnEnabledColor = '#FF4081';

class ForgotForm extends InputView {
  constructor(props) {
    super(props);
    this._onChangeEmail = this._onChangeEmail.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
    this._dismissForm = this._dismissForm.bind(this);

    this.state = {
      email: '',
      password: '',
      keyboardSpace: 0,
      errorMessage: '',
      isEmailValid: false,
      isLoading: false,
      didSend: false
    }
  }

  _onChangeEmail(email) {
    let isEmailValid = false;
    let errorMessage = this.state.errorMessage;
    if (validator.isEmail(email)) {
      isEmailValid = true;
      if (errorMessage === emailErrorMsg) {
        errorMessage = '';
      }
    }

    this.setState({
      email: email,
      isEmailValid: isEmailValid,
      errorMessage: errorMessage
    });
  }

  updateKeyboardSpace(height) {
    this.setState({keyboardSpace: height});
  }

  resetKeyboardSpace() {
    this.setState({keyboardSpace: 0});
  }

  _onSubmit() {
    let email = this.state.email.trim();
    if (!validator.isEmail(email)) {
      this.setState({
        errorMessage: emailErrorMsg
      });
    } else if(!this.state.isLoading) {
      this.setState({isLoading: true});
      Authenticate.forgot(email)
        .then(() => {
          this.setState({
            didSend: true
          });
        })
        .catch((err) => {
          this.setState({
            errorMessage: serverErrorMsg,
            isLoading: false
          });
        });
    }
  }

  _dismissForm() {
    this.props.navigator.pop();
  }

  render() {
    if (!this.state.didSend) {
      let buttonBackgroundColor = btnDisabledColor;
      if (this.state.isEmailValid && !this.state.isLoading) {
        buttonBackgroundColor = btnEnabledColor;
      }
      return (
        <View style={{flex: 1}}>
        <SMTINavigationBar title='Forgot' leftButton={<CloseNavigationButton navigator={this.props.navigator} side={'left'}/>} />
          <ScrollView backgroundColor={'#FFFFFF'} contentContainerStyle={styles.maxContainer} keyboardShouldPersistTaps={false}>
            <View style={styles.maxContainer}>
              <View style={[styles.container, {flex: .20}]}>
            </View>
              <View style={[styles.container, {flex: .80, margin: 20}]}>
                <TextInput style={[styles.textbox, {margin: 5}]} placeholder={'Email'} onChangeText={this._onChangeEmail}
                  value={this.state.email} autoFocus={false} keyboardType={'email-address'} returnKeyType={'done'} maxLength={150} autoCapitalize={'none'}/>
                <View style={{borderWidth: 1, borderColor: 'transparent', borderBottomColor: '#DCDCDC', margin: 5}}></View>
                <SpinnerButton showSpinner={this.state.isLoading} title="Send Reset" backgroundColor={buttonBackgroundColor} underlayColor={btnDisabledColor} onPress={this._onSubmit} />
                <Text style={Common.warningText}>{this.state.errorMessage}</Text>
              </View>
            </View>
          </ScrollView>
        </View>
      );
    } else {
      return (
        <ScrollView backgroundColor={'#FFFFFF'} contentContainerStyle={styles.maxContainer} keyboardShouldPersistTaps={false}>
          <View style={styles.maxContainer}>
            <View style={[styles.container, {flex: .20}]}>
          </View>
            <View style={[styles.container, {flex: .80, margin: 20}]}>
              <Text style={styles.successMessage}>Reset instructions sent to: {this.state.email}</Text>
              <DefaultButton title='Okay' onPress={this._dismissForm} backgroundColor={'#FF4081'} activeOpacity={.2} underlayColor={'#FCE4EC'} textColor={'#212121'} />
            </View>
          </View>
        </ScrollView>
      );
    }
  }
}

const styles = StyleSheet.create({
  maxContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    backgroundColor: '#F9F9F9',
  },
  container: {
    flex: .5,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  textbox: {
    height: 36, // 36
    fontSize: 17, // 25
    color: '#212121',
    fontWeight: '300', //500
    fontFamily: 'Roboto',
  },
  successMessage: {
    margin: 10,
    fontSize: 22, // 25
    color: '#212121',
    fontWeight: '500', //500
    fontFamily: 'Roboto',
  },
});

export default ForgotForm;
