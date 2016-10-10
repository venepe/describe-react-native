'use strict';

import Relay from 'react-relay';
import { SMTIGraphQLUrl } from '../constants';
import { cleanSubscriptions } from '../stores/SubscriptionStore';
const FileUpload = require('NativeModules').FileUpload;

class SMTIDefaultNetworkLayer {

  constructor(socket, token) {
    this.socket = socket;
    this.token = token;

    socket.on('connect', () => {
      socket.emit('authenticate', {token});
    });

    this.subscriptionId = 0;
    this.subscriptions = {};
    this.socket.on('graphql/subscription/response', payload => this.handleSubscription(payload));

    this.SMTIDefaultNetworkLayer = new Relay.DefaultNetworkLayer(SMTIGraphQLUrl, {
      headers: {
        'x-smti-authorization': token
      }
    });
  }

  sendMutation(mutationRequest) {
    let files = mutationRequest.getFiles();
    if (files && files.length > 0) {
      let obj = {
          uploadUrl: SMTIGraphQLUrl,
          method: 'POST', // default 'POST',support 'POST' and 'PUT'
          headers: {
            'Accept': 'application/json',
            'x-smti-authorization': this.token
          },
          fields: {
            'query': mutationRequest.getQueryString(),
            'variables': JSON.stringify(mutationRequest.getVariables())
          },
          files: [
            {
              filename: '0',
              filepath: files[0]
            }
          ]
      };
      return  FileUpload.upload(obj, function(err, result) {
          if (err) {
            mutationRequest.reject(new Error(err));
          } else {
            var payload = JSON.parse(result.data);
            mutationRequest.resolve({response: payload.data});
          }
        });
    } else {
      return this.SMTIDefaultNetworkLayer.sendMutation(mutationRequest);
    }
  }

  sendQueries(queryRequests) {
    return this.SMTIDefaultNetworkLayer.sendQueries(queryRequests);
  }

  sendSubscription(subscriptionRequest) {
    const id = this.subscriptionId++;
    const token = this.token;

    this.subscriptions[id] = subscriptionRequest;
    this.socket.emit('graphql/subscription', {
      id,
      token,
      query: subscriptionRequest.getQueryString(),
      variables: subscriptionRequest.getVariables()
    });

    return {
      dispose: () => {
        this.socket.emit('graphql/subscription/unsubscribe', {id});
        delete this.subscriptions[id];
      }
    }
  }

  supports(...options) {
    return false;
  }

  handleSubscription(payload) {
    const request = this.subscriptions[payload.id];
    if (request) {
      if (payload.errors) {
        request.onError(payload.errors);
      } else if (!payload.data) {
        request.onError('Server response was missing `data`.');
      } else {
        request.onNext({response: payload.data});
        cleanSubscriptions(payload.data);
      }
    }
  }
}

export default SMTIDefaultNetworkLayer;
