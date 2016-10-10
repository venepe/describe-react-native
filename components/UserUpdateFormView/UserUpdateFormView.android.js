'use strict';

import React, { Component, PropTypes } from 'react';
import { StyleSheet, ToolbarAndroid, View } from 'react-native';
import Relay from 'react-relay';
import UserUpdateForm from '../UserUpdateForm';
import { Common } from '../../styles';
import { UpdateUserMutation } from '../../mutations';
import SMTIAnalytics from '../../lib/SMTIAnalytics';
import { isValidName } from '../../lib/utilities';

class UserUpdateFormView extends Component {
  constructor(props) {
    super(props);
    this._onActionSelected = this._onActionSelected.bind(this);
    this._onChangeName = this._onChangeName.bind(this);
    this._onChangeSummary = this._onChangeSummary.bind(this);
    this._onChangeFullname = this._onChangeFullname.bind(this);
    this._onUpdate = this._onUpdate.bind(this);
    let isDisabled = true;
    if (isValidName(props.me.name)) {
      isDisabled = false;
    }

    this.state = {
      name: props.me.name,
      fullName: props.me.fullName,
      summary: props.me.summary,
      isDisabled: isDisabled
    }
  }

  _onChangeName(name) {
    let isDisabled = true;
    if (isValidName(name)) {
      isDisabled = false;
    }
    this.setState({name, isDisabled});
  }

  _onChangeSummary(summary) {
    this.setState({summary});
  }

  _onChangeFullname(fullName) {
    this.setState({fullName});
  }

  _onActionSelected(position) {
    if (position === 0) {
      this._onUpdate();
    }
  }

  _onUpdate() {
    let name = this.state.name;
    let fullName = this.state.fullName;
    let summary = this.state.summary;
    if (isValidName(name)) {
      Relay.Store.commitUpdate(
        new UpdateUserMutation({name, fullName, summary, user: this.props.me})
      );

      //Start SMTIAnalytics
      SMTIAnalytics.track(SMTIAnalytics.Events.UPDATED_PROFILE);
      //End SMTIAnalytics

      this.props.navigator.pop();
    }
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
        <ToolbarAndroid title='Edit Profile' titleColor='#FFFFFF' style={{backgroundColor: '#607d8b', height: 56,}} actions={[{title: 'Update', icon: require('image!ic_check'), show: 'always'}]} onActionSelected={this._onActionSelected}/>
        <UserUpdateForm name={this.props.me.name} summary={this.props.me.summary} fullName={this.props.me.fullName}
          onChangeName={this._onChangeName} onChangeSummary={this._onChangeSummary} onChangeFullname={this._onChangeFullname} isDisabled={this.state.isDisabled} />
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

export default Relay.createContainer(UserUpdateFormView, {
  fragments: {
    me: () => Relay.QL`
      fragment on User {
        name
        email
        fullName
        summary
        ${UpdateUserMutation.getFragment('user')}
      }
    `,
  },
});
