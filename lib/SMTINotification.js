'use strict';

import SMTIStorage from './storage';
import { SMTIBaseUrl } from '../constants';

const register = (notificationId, platform) => {
  let notification = {notificationId, platform};
  return new Promise((resolve, reject) => {
    SMTIStorage.getToken()
      .then((token) => {
        return fetch(SMTIBaseUrl + '/notification', {
            method: 'post',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'x-smti-authorization': token
            },
            body: JSON.stringify({notification})
          })
      })
      .then(status)
      .then(json)
      .then((json) => {
        let notification = json.notification || {};
        let notificationId = notification.notificationId || '';
        return SMTIStorage.saveNotificationId(notificationId);
      })
      .then((notificationId) => {
        resolve(notificationId);
      })
      .catch((error) => {
        console.log('did fail');
        reject();
      })
  });
}

const unregister = (notificationId) => {
  let notification = {notificationId};
  return new Promise((resolve, reject) => {
    SMTIStorage.getTokenAndNotificationId()
      .then((result) => {
        let token = result[0];
        let notificationId = result[1];
        return fetch(SMTIBaseUrl + `/notification/${notificationId}`, {
            method: 'delete',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'x-smti-authorization': token
            },
            body: JSON.stringify({notification})
          })
      })
      .then(status)
      .then(json)
      .then(() => {
        return SMTIStorage.clearNotificationId();
      })
      .then(() => {
        resolve();
      })
      .catch((error) => {
        console.log('did fail');
        reject();
      })
  });
}

const status = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response
  }
  throw new Error(response.statusText)
}

const json = (response) => {
  return response.json()
}

const SMTINotification = {
  register,
  unregister
}

export default SMTINotification;
