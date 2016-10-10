'use strict';

import React, { Component, PropTypes } from 'react';
import { ScrollView, View } from 'react-native';
import Relay from 'react-relay';
import { Common } from '../../styles';
import Archy from '../Archy';
import ArchyLabel from '../ArchyLabel';
import ArchyInput from '../ArchyInput';
import { getProjectPlaceholderText } from '../../lib/utilities';

class ProjectForm extends Component {
  static propTypes = {
    onChangeTitle: PropTypes.func,
    title: PropTypes.string
  }

  static defaultProps = {
    onChangeTitle: function() {},
    title: ''
  }

  constructor(props) {
    super(props);
    const projectPlaceholder = getProjectPlaceholderText();
    this._onChangeTitle = this._onChangeTitle.bind(this);

    this.state = {
      archible: {
        component: (<ArchyLabel text={'describe'} />),
        nodes: [
          {
            component: (<ArchyInput text={props.title} placeholder={projectPlaceholder} onChangeText={this._onChangeTitle} />),
            nodes: [],
          },
        ],
      },
      title: props.title
    }
  }

  _onChangeTitle(title) {
    this.setState({
      title
    });
    this.props.onChangeTitle(title);
  }

  render() {

    return (
      <View style={[Common.maxContainer]}>
        <ScrollView>
          <Archy archible={this.state.archible}/>
        </ScrollView>
      </View>
    );
  }
}

export default ProjectForm;
