'use strict';

import React, { Component, PropTypes } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, ToolbarAndroid, View } from 'react-native';
import InputView from '../InputView';
import DefaultButton from '../DefaultButton';
import BackNavigationButton from '../BackNavigationButton';
import CheckNavigationButton from '../CheckNavigationButton';
import Authenticate from '../../lib/authenticate';
import { isValidPassword } from '../../lib/utilities';
import { Common } from '../../styles';
const serverErrorMsg = 'Invalid. Please try again';
const passwordErrorMsg = 'Current or new password is invalid';

class PasswordForm extends InputView {
  constructor(props) {
    super(props);
    this._onChangeCurrentPassword = this._onChangeCurrentPassword.bind(this);
    this._onChangeNewPassword = this._onChangeNewPassword.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
    this._closeModal = this._closeModal.bind(this);
    this._onActionSelected = this._onActionSelected.bind(this);

    this.state = {
      current: '',
      new: '',
      keyboardSpace: 0,
      errorMessage: '',
      isCurrentPasswordValid: false,
      isNewPasswordValid: false,
      isLoading: false
    }
  }

  _onChangeCurrentPassword(password) {
    let isPasswordValid = isValidPassword(password);
    this.setState({
      current: password,
      isCurrentPasswordValid: isPasswordValid,
      errorMessage: ''
    });
  }

  _onChangeNewPassword(password) {
    let isPasswordValid = isValidPassword(password);
    this.setState({
      new: password,
      isNewPasswordValid: isPasswordValid,
      errorMessage: ''
    });
  }
  _onActionSelected(position) {
    if (position === 0) {
      this._onSubmit();
    }
  }

  _onSubmit() {
    let currentPassword = this.state.current;
    let newPassword = this.state.new;
    if (this.state.isNewPasswordValid && this.state.isCurrentPasswordValid) {
      this.setState({isLoading: true});
      Authenticate.password(currentPassword, newPassword)
        .then(() => {
          this.props.navigator.pop();
        })
        .catch((err) => {
          this.setState({
            errorMessage: serverErrorMsg,
            isLoading: false
          });
        });
    } else {
      this.setState({
        errorMessage: passwordErrorMsg,
        isLoading: false
      });
    }
  }

  _closeModal() {
    this.props.navigator.pop();
  }

  render() {

    return (
      <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
        <ToolbarAndroid title='Change Password' titleColor='#FFFFFF' style={{backgroundColor: '#607d8b', height: 56,}} actions={[{title: 'Change', icon: require('image!ic_check'), show: 'always'}]} onActionSelected={this._onActionSelected}/>
        <ScrollView backgroundColor={'#FFFFFF'} contentContainerStyle={styles.maxContainer} keyboardShouldPersistTaps={false}>
          <View style={styles.maxContainer}>
            <View style={[styles.container, {flex: 1, margin: 20}]}>
              <TextInput style={[styles.textbox, {margin: 5}]} placeholder={'Current Password'} onChangeText={this._onChangeCurrentPassword}
                value={this.state.email} autoFocus={false} password={true} returnKeyType={'done'} maxLength={32}/>
              <View style={{borderWidth: 1, borderColor: 'transparent', borderBottomColor: '#DCDCDC', margin: 5}}></View>
              <TextInput style={[styles.textbox, {margin: 5, marginBottom: 10}]} placeholder={'New Password'} onChangeText={this._onChangeNewPassword}
                password={true} value={this.state.newPassword} returnKeyType={'done'} maxLength={32}/>
              <Text style={Common.warningText}>{this.state.errorMessage}</Text>
            </View>
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
    backgroundColor: '#FFFFFF',
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
    color: '#000000',
    fontWeight: '300', //500
    fontFamily: 'Roboto',
  },
});

export default PasswordForm;
