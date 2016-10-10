'use strict';

import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import CollaboratorListNavigationBar from '../components/CollaboratorListNavigationBar';
import { ProjectRoute } from '../routes';

export default class CollaboratorListNavigationBarContainer extends Component {
  static propTypes = {
    projectId: PropTypes.string,
    meId: PropTypes.string,
  }

  static defaultProps = {
    projectId: '',
    meId: '',
  }

  constructor(props) {
    super(props);
  }

  render() {

    let projectId = this.props.projectId;
    let meId = this.props.meId;
    let projectRoute = new ProjectRoute({projectId, meId});

    return (
       <Relay.RootContainer Component={CollaboratorListNavigationBar} route={projectRoute} renderFetched={data => <CollaboratorListNavigationBar {...data} navigator={this.props.navigator} /> } />
    );
  }
}
