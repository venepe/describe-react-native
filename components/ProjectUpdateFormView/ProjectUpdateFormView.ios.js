'use strict';

import React, { Component, PropTypes } from 'react';
import { ScrollView, View } from 'react-native';
import Relay from 'react-relay';
import NavigationBar from 'react-native-navbar';
import ProjectForm from '../ProjectForm';
import { Common } from '../../styles';
import CloseNavigationButton from '../CloseNavigationButton';
import CheckNavigationButton from '../CheckNavigationButton';
import { UpdateProjectMutation } from '../../mutations';
import { isValidTitle } from '../../lib/utilities';

class ProjectUpdateFormView extends Component {
  constructor(props) {
    super(props);
    this._onUpdate = this._onUpdate.bind(this);
    this._closeModal = this._closeModal.bind(this);
    this._onChangeTitle = this._onChangeTitle.bind(this);

    this.state = {
      isDisabled: true,
      text: props.project.text
    }
  }

  _onUpdate() {
    let text = this.state.text;
    if (isValidTitle(text)) {
      Relay.Store.commitUpdate(
        new UpdateProjectMutation({text, project: this.props.project})
      );
    }
    this.props.navigator.pop();
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
        <NavigationBar title={{title: 'Edit Event', tintColor: '#373e4d'}} leftButton={<CloseNavigationButton side={'left'} onPress={this._closeModal}/>} rightButton={<CheckNavigationButton isDisabled={this.state.isDisabled} onPress={this._onUpdate}/>} />
        <ProjectForm title={this.props.project.text} onChangeTitle={this._onChangeTitle}  />
      </View>
    );
  }
}

export default Relay.createContainer(ProjectUpdateFormView, {
  fragments: {
    project: () => Relay.QL`
      fragment on Project {
        text
        ${UpdateProjectMutation.getFragment('project')}
      }
    `,
    me: () => Relay.QL`
      fragment on User {
        id
      }
    `,
  },
});
