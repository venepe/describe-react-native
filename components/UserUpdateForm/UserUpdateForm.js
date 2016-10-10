'use strict';

import React, { Component, PropTypes } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Common } from '../../styles';

class UserUpdateForm extends Component {
  static propTypes = {
    onChangeName: PropTypes.func,
    onChangeSummary: PropTypes.func,
    onChangeFullname: PropTypes.func,
    name: PropTypes.string,
    summary: PropTypes.string,
    fullName: PropTypes.string,
    isDisabled: PropTypes.bool
  }

  static defaultProps = {
    onChangeName: function() {},
    onChangeSummary: function() {},
    onChangeFullname: function() {},
    name: '',
    summary: '',
    fullName: '',
    isDisabled: true
  }

  constructor(props) {
    super(props);
    this._onChangeName = this._onChangeName.bind(this);
    this._onChangeSummary = this._onChangeSummary.bind(this);
    this._onChangeFullname = this._onChangeFullname.bind(this);

    this.state = {
      name: props.name,
      fullName: props.fullName,
      summary: props.summary
    }
  }

  _onChangeName(name) {
    this.setState({name});
    this.props.onChangeName(name);
  }

  _onChangeSummary(summary) {
    this.setState({summary});
    this.props.onChangeSummary(summary);
  }

  _onChangeFullname(fullName) {
    this.setState({fullName});
    this.props.onChangeFullname(fullName);
  }

  render() {

    let warningColor = this.props.isDisabled ? '#F50F50' : '#212121';

    return (
        <View style={[styles.maxContainer]}>
          <ScrollView backgroundColor={'#FFFFFF'} contentContainerStyle={{flex: 1}} keyboardShouldPersistTaps={false}>
            <View style={[Common.card, {flex: 1, padding: 10}]}>
              <Text style={styles.textLabel}>Username</Text>
              <TextInput style={[styles.textbox, {color: warningColor}]} placeholder={'username'} onChangeText={this._onChangeName}
                 value={this.state.name} returnKeyType={'done'} maxLength={32} autoCapitalize={'none'}/>
              <View style={[styles.bottomSpacer]}></View>
              <Text style={styles.textLabel}>Full Name</Text>
              <TextInput style={styles.textbox} placeholder={'John Dow'} onChangeText={this._onChangeFullname}
                 value={this.state.fullName} returnKeyType={'done'} />
              <View style={[styles.bottomSpacer]}></View>
              <Text style={styles.textLabel}>Summary</Text>
              <TextInput style={styles.textboxMulti} multiline={true} placeholder={'A brief description'} onChangeText={this._onChangeSummary}
                 value={this.state.summary} maxLength={150} />
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
  textboxMulti: {
    height: 124, // 36
    fontSize: 17, // 25
    color: '#212121',
    fontWeight: '300', //500
    fontFamily: 'Roboto',
  },
  bottomSpacer: {
    margin: 10,
    borderWidth: 1,
    borderColor: 'transparent',
    borderBottomColor: '#E6E6E6'
  },
});

export default UserUpdateForm;
