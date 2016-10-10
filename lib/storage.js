'use strict';

import React from 'react';
import { AsyncStorage } from 'react-native';
const tokenKey = 'SMTITokenKey';
const meIdKey = 'SMTIUserIdKey';
const notificationIdKey = 'SMTINotificationIdKey';

const saveToken = (token) => {
  return new Promise((resolve, reject) => {
    AsyncStorage.setItem(tokenKey, token)
      .then(() => {
        resolve(token);
      })
      .catch((e) => {
        reject(e);
      });
  });
}

const saveTokenAndMeId = (token, meId) => {
  return new Promise((resolve, reject) => {
    AsyncStorage.multiSet([[tokenKey, token], [meIdKey, meId]])
      .then(() => {
        resolve([token, meId]);
      })
      .catch((e) => {
        reject(e);
      });
  });
}

const getToken = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(tokenKey)
      .then((token) => {
        resolve(token);
      })
      .catch((e) => {
        reject(e);
      });
  });
}

const getMeId = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(meIdKey)
      .then((meId) => {
        resolve(meId);
      })
      .catch((e) => {
        reject(e);
      });
  });
}

const getTokenAndMeId = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.multiGet([tokenKey, meIdKey])
      .then((result) => {
        resolve([result[0][1], result[1][1]]);
      })
      .catch((e) => {
        reject(e);
      });
  });
}

const clearCredentials = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.multiRemove([tokenKey, meIdKey])
      .then(() => {
        resolve();
      })
      .catch((e) => {
        reject(e);
      });
  });
}

const saveNotificationId = (notificationId) => {
  return new Promise((resolve, reject) => {
    AsyncStorage.setItem(notificationIdKey, notificationId)
      .then(() => {
        resolve(notificationId);
      })
      .catch((e) => {
        reject(e);
      });
  });
}

const getNotificationId = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(notificationIdKey)
      .then((notificationId) => {
        resolve(notificationId);
      })
      .catch((e) => {
        reject(e);
      });
  });
}

const getTokenAndNotificationId = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.multiGet([tokenKey, notificationIdKey])
      .then((result) => {
        resolve([result[0][1], result[1][1]]);
      })
      .catch((e) => {
        reject(e);
      });
  });
}

const clearNotificationId = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.multiRemove([notificationIdKey])
      .then(() => {
        resolve();
      })
      .catch((e) => {
        reject(e);
      });
  });
}

const Storage = {
  saveToken,
  saveTokenAndMeId,
  getToken,
  getMeId,
  getTokenAndMeId,
  clearCredentials,
  saveNotificationId,
  getNotificationId,
  getTokenAndNotificationId,
  clearNotificationId
}

export default Storage
