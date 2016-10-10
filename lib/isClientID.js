'use strict';

/**
 * @providesModule RelayRecord
 */
export const isClientID = function(dataID) {
  return dataID.substring(0, 7) === 'client:';
}
