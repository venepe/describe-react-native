'use strict';

import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import CloseNavigationButton from '../CloseNavigationButton';
import SMTINavigationBar from '../SMTINavigationBar';

class ChannelNavigationBar extends Component {
  static propTypes = {
    title: PropTypes.string,
  }

  static defaultProps = {
    title: 'Channel',
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SMTINavigationBar title={this.props.title} leftButton={<CloseNavigationButton navigator={this.props.navigator} side={'left'} /> } hidePrev={true} />
    );
  }
}

export default Relay.createContainer(ChannelNavigationBar, {
  fragments: {
    channel: () => Relay.QL`
      fragment on Channel {
        id
      }
    `,
  },
});
