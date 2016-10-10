'use strict';

import { AUTHENTICATED, NOT_AUTHENTICATED } from '../constants/AuthenticatedTypes';

const authenticated = (meId = '') => {
  return {
    type: AUTHENTICATED,
    meId
  };
}

const notAuthenticated = () => {
  return {
    type: NOT_AUTHENTICATED,
    meId: ''
  };
}

const AuthenticatedActions = {
  authenticated,
  notAuthenticated
}

export default AuthenticatedActions;
