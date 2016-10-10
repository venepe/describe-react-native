'use strict';

import mixpanel from 'react-native-mixpanel-js';
import DeviceInfo from 'react-native-device-info';
import base64 from 'base-64';
const token = process.env.MIXPANE_TOKEN;
let distinctId = '';

const Events = {
  OPENED_APP: 'opened the app',
  SIGNED_IN: 'signed in',
  REGISTERED: 'registered',
  CREATED_PROJECT: 'created a project',
  ADDED_CONTACT: 'added a contact',
  ADDED_COVER_IMAGE: 'added a cover image',
  ADDED_TEST_CASE: 'added a test case',
  FULFILLED_TEST_CASE: 'fulfilled a test case',
  REJECTED_FULFILLMENT: 'rejected a fulfillment',
  UPDATED_PROFILE: 'updated their profile',
  SENT_INVITATION: 'sent an invitation',
  ACCEPTED_INVITATION: 'accepted an invitation',
  DECLINED_INVITATION: 'declined an invitation',
  ADDED_MESSAGE: 'added a message'
}

const getDefaultProps = () => {
  return {
    $manufacturer: DeviceInfo.getManufacturer(),
    $model: DeviceInfo.getModel(),
    $os: DeviceInfo.getSystemName(),
    $os_version: DeviceInfo.getSystemVersion(),
    $app_version: DeviceInfo.getVersion()
  };
}

const setIdentity = (jwtToken) => {
  if (process.env.NODE_ENV !== 'production') {
    return;
  }

  let payload = {};
  let email;
  let id;
  if (jwtToken) {
    try {
      payload = JSON.parse(base64.decode(jwtToken.split('.')[1]));
      email = payload.email;
      distinctId = payload.id;
      mixpanel({
        token,
        distinctId,
        userProfileData: {
          $email: email
        }
      });
    } catch (e) {
      console.log(e);
    }
  }
}

const track = (eventName, properties) => {
  if (process.env.NODE_ENV === 'production') {
    let properties = getDefaultProps();
    mixpanel({
      token,
      distinctId,
      eventName,
      properties
    });
  }
}

const SMTIAnalytics = {
  Events,
  setIdentity,
  track
}

export default SMTIAnalytics;
