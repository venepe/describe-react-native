'use strict';

import React, { Component, PropTypes } from 'react';
import { ScrollView, View } from 'react-native';
import Relay from 'react-relay';
import NavigationBar from 'react-native-navbar';
import ProjectForm from '../ProjectForm';
import { Common } from '../../styles';
import CloseNavigationButton from '../CloseNavigationButton';
import CheckNavigationButton from '../CheckNavigationButton';
import { IntroduceProjectMutation } from '../../mutations';
import SMTIAnalytics from '../../lib/SMTIAnalytics';
import { isValidTitle } from '../../lib/utilities';

class ProjectFormView extends Component {
  constructor(props) {
    super(props);
    this._onCreate = this._onCreate.bind(this);
    this._closeModal = this._closeModal.bind(this);
    this._onChangeTitle = this._onChangeTitle.bind(this);

    this.state = {
      isDisabled: true,
      text: ''
    }
  }

  _onCreate() {
    let text = this.state.text;
    if (isValidTitle(text)) {
      Relay.Store.commitUpdate(
        new IntroduceProjectMutation({text, me: this.props.me})
      );

      //Start SMTIAnalytics
      SMTIAnalytics.track(SMTIAnalytics.Events.CREATED_PROJECT);
      //End SMTIAnalytics

      this.props.navigator.pop();
    }
  }

  _closeModal() {
    this.props.navigator.pop();
  }

  _onChangeTitle(text) {
    let isDisabled = true;
    if (isValidTitle(text)) {
      isDisabled = false;
    }
    this.setState({
      text,
      isDisabled
    });
  }

  render() {

    return (
      <View style={{flex: 1}}>
        <NavigationBar title={{title: 'Start Event', tintColor: '#373e4d'}} leftButton={<CloseNavigationButton side={'left'} onPress={this._closeModal}/>} rightButton={<CheckNavigationButton isDisabled={this.state.isDisabled} onPress={this._onCreate}/>} />
        <ProjectForm onChangeTitle={this._onChangeTitle}  />
      </View>
    );
  }
}

export default Relay.createContainer(ProjectFormView, {
  fragments: {
    me: () => Relay.QL`
      fragment on User {
        ${IntroduceProjectMutation.getFragment('me')}
      }
    `,
  },
});
