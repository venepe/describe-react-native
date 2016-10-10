'use strict';

import _ from 'lodash';

const forceFetchStore = {};

export const applyForceFetch = (nodeId) => {
  const shouldForceFetch = !!forceFetchStore[nodeId];
  forceFetchStore[nodeId] = false;
  return shouldForceFetch;
}

export const resetStore = (state = true) => {
  _.forEach(forceFetchStore, (value, key) => {
    forceFetchStore[key] = state;
  });
}

export default { applyForceFetch, resetStore };
