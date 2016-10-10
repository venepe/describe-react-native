'use strict';

import React, { Component, PropTypes } from 'react';
const ReactRedux = require('react-redux');
import SpinnerView from '../SpinnerView';
import Authenticate from '../../lib/authenticate';
import AuthenticatedActions from '../../actions/AuthenticatedActions';
const initNetwork = require('../../lib/initNetwork');

class RefreshTokenView extends Component {
  static propTypes = {
    didRefreshToken: PropTypes.func
  }

  static defaultProps = {
    didRefreshToken: function() {}
  }

  constructor(props) {
    super(props);
    this._refreshToken = this._refreshToken.bind(this);
    this._refreshToken();
    this.state = {
      doLogOff: false
    }
  }

  _refreshToken() {
    Authenticate.refreshToken()
      .then((refreshedToken) => {
        initNetwork(refreshedToken);
        this.props.didRefreshToken();
      })
      .catch((err) => {
        this.setState({
          doLogOff: true
        })
      })
      .finally(() => {
        if (this.state.doLogOff) {
          initNetwork();
          this.props.notAuthenticated();
        }
      });
  }

  render() {
    return <SpinnerView />
  }
}

// Which part of the Redux global state does our component want to receive as props?
function mapStateToProps(state) {
  return {
    meId: state.meId
  };
}

// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch) {
  return {
    notAuthenticated: () => dispatch(AuthenticatedActions.notAuthenticated())
  };
}

const RefreshTokenViewRedux = ReactRedux.connect(
  mapStateToProps,
  mapDispatchToProps
)(RefreshTokenView);

export default RefreshTokenViewRedux;
