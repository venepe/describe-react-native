'use strict';

import React, { Component, PropTypes } from 'react';
import { StyleSheet } from 'react-native';
import NavigationBar from 'react-native-navbar';
import BackNavigationButton from '../BackNavigationButton';

class SMTINavigationBar extends Component {
  static defaultProps = {
    title: ''
  }

  constructor(props) {
    super(props);
    this.state = {
      ...props
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...nextProps
    });
  }

  render() {
    let backButton = {title: ''};
    if (this.state.leftButton) {
      backButton = this.state.leftButton;
    } else if (this.state.hidePrev !== true) {
      backButton = (<BackNavigationButton navigator={this.props.navigator} side={'left'}/>);
    }
    let title = this.state.title;
    if (title.length > 30) {
      title = `${title.substring(0, 28)}...`;
    }

    return (
      <NavigationBar title={{tintColor: '#373e4d', title}} leftButton={backButton} rightButton={this.state.rightButton} navigator={this.props.navigator} route={this.props.route} />
    );
  }
}

export default SMTINavigationBar;
