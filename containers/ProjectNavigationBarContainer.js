'use strict';

import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import ProjectNavigationBar from '../components/ProjectNavigationBar';
import { ProjectRoute } from '../routes';

export default class ProjectNavigationBarContainer extends Component {
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
       <Relay.RootContainer Component={ProjectNavigationBar} route={projectRoute} renderFetched={data => <ProjectNavigationBar {...data} navigator={this.props.navigator} /> } />
    );
  }
}
