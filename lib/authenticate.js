'use strict';

import SMTIStorage from './storage';
import { SMTIBaseUrl } from '../constants';
import { initNetwork } from './initNetwork';

const login = (email, password) => {
  let authenticate = {email, password};
  return new Promise((resolve, reject) => {
    fetch(SMTIBaseUrl + '/authenticate', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({authenticate})
      })
      .then(status)
      .then(json)
      .then((json) => {
        let authenticate = json.authenticate || {};
        let token = authenticate.token || '';
        let id = authenticate.id || '';
        return SMTIStorage.saveTokenAndMeId(token, id);
      })
      .then((result) => {
        let token = result[0];
        let meId = result[1];
        initNetwork(token);
        resolve(meId);
      }).catch((error) => {
        reject();
      })
  });
}

const register = (email, password) => {
  let register = {email, password};
  return new Promise((resolve, reject) => {
    fetch(SMTIBaseUrl + '/register', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({register})
      })
      .then(status)
      .then(json)
      .then((json) => {
        let register = json.register || {};
        let token = register.token || '';
        let id = register.id || '';
        return SMTIStorage.saveTokenAndMeId(token, id);
      })
      .then((result) => {
        let token = result[0];
        let meId = result[1];
        initNetwork(token);
        resolve(meId);
      }).catch((error) => {
        console.log(error);
        reject();
      })
  });
}

const refreshToken = () => {
  return new Promise((resolve, reject) => {
    SMTIStorage.getToken()
      .then((token) => {
        return fetch(SMTIBaseUrl + '/token', {
            method: 'post',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'x-smti-authorization': token
            },
            body: JSON.stringify({})
          })
      })
      .then(status)
      .then(json)
      .then((json) => {
        let token = json.token || '';
        return SMTIStorage.saveToken(token);
      })
      .then((token) => {
        initNetwork(token);
        resolve(token);
      }).catch((error) => {
        console.log('did fail');
        reject();
      })
  });
}

const password = (currentPassword, newPassword) => {
  var password = {current: currentPassword, new: newPassword};
  return new Promise((resolve, reject) => {
    SMTIStorage.getToken()
      .then((token) => {
        return fetch(SMTIBaseUrl + '/password', {
            method: 'post',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'x-smti-authorization': token
            },
            body: JSON.stringify({password})
          })
      })
      .then(status)
      .then(json)
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject();
      })
  });
}

const forgot = (email) => {
  var forgot = {email};
  return new Promise((resolve, reject) => {
    fetch(SMTIBaseUrl + '/forgot', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({forgot})
      })
      .then(status)
      .then(json)
      .then((result) => {
        resolve();
      }).catch((error) => {
        reject();
      })
  });
}

const logoff = () => {
  return new Promise((resolve, reject) => {
    SMTIStorage.clearCredentials()
      .then(() => {
        initNetwork();
        resolve();
      }).catch((error) => {
        initNetwork();
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

const Authenticate = {
  login,
  logoff,
  register,
  refreshToken,
  password,
  forgot
}

export default Authenticate;
