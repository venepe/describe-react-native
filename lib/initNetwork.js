'use strict';

import Relay from 'react-relay';
import './UserAgent';
import { SMTIBaseUrl } from '../constants';
import SMTIAnalytics from './SMTIAnalytics';
import SMTIDefaultNetworkLayer from './SMTIDefaultNetworkLayer';
import IO from 'socket.io-client/socket.io';

export const initNetwork = (token = '') => {
  const socket = IO(SMTIBaseUrl, {transports: ['websocket']});

  //Start SMTIAnalytics
  SMTIAnalytics.setIdentity(token);
  //End SMTIAnalytics

  Relay.injectNetworkLayer(new SMTIDefaultNetworkLayer(socket, token));

}
