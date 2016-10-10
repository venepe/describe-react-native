'use strict';

import React, { Component, PropTypes } from 'react';
import { ScrollView, ToolbarAndroid, View } from 'react-native';
import Relay from 'react-relay';
import ProjectForm from '../ProjectForm';
import { Common } from '../../styles';
import { IntroduceProjectMutation } from '../../mutations';
import SMTIAnalytics from '../../lib/SMTIAnalytics';
import { isValidTitle } from '../../lib/utilities';

class ProjectFormView extends Component {
  constructor(props) {
    super(props);
    this._onCreate = this._onCreate.bind(this);
    this._onActionSelected = this._onActionSelected.bind(this);
    this._onChangeTitle = this._onChangeTitle.bind(this);

    this.state = {
      isDisabled: true,
      text: ''
    }
  }

  _onActionSelected(position) {
    if (position === 0) {
      this._onCreate();
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
        <ToolbarAndroid title='Start Event' titleColor='#FFFFFF' style={{backgroundColor: '#607d8b', height: 56,}} actions={[{title: 'Start', icon: require('image!ic_check'), show: 'always'}]} onActionSelected={this._onActionSelected}/>
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
