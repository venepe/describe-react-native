'use strict';

import React, { Component, PropTypes } from 'react';
import { ScrollView, ToolbarAndroid, View } from 'react-native';
import Relay from 'react-relay';
import ProjectForm from '../ProjectForm';
import { Common } from '../../styles';
import { UpdateProjectMutation } from '../../mutations';
import { isValidTitle } from '../../lib/utilities';

class ProjectUpdateFormView extends Component {
  constructor(props) {
    super(props);
    this._onUpdate = this._onUpdate.bind(this);
    this._onActionSelected = this._onActionSelected.bind(this);
    this._onChangeTitle = this._onChangeTitle.bind(this);

    this.state = {
      isDisabled: true,
      text: props.project.text
    }
  }

  _onActionSelected(position) {
    if (position === 0) {
      this._onUpdate();
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
        <ToolbarAndroid title='Edit Event' titleColor='#FFFFFF' style={{backgroundColor: '#607d8b', height: 56,}} actions={[{title: 'Update', icon: require('image!ic_check'), show: 'always'}]} onActionSelected={this._onActionSelected}/>
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
