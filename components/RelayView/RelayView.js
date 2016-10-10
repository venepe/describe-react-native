'use strict';

import React, { Component } from 'react';
import FailureView from '../FailureView';
import RefreshTokenView from '../RefreshTokenView';
import SpinnerView from '../SpinnerView';

class RelayView extends Component {
  constructor(props) {
    super(props);
  }

  renderLoading() {
    return <SpinnerView />
  }

  renderFailure(error, retry) {
    let status = error.status;
    if (status === 403 || status === 401) {
      return <RefreshTokenView didRefreshToken={() => {
          retry();
        }} />
    } else {
      return <FailureView retry={retry}/>
    }
  }
}

export default RelayView;
