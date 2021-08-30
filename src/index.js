const fetch = require('isomorphic-unfetch');

// const Utils = require('./utils/utils');
const Constants = require('./utils/constants');

/**
 * @class FaceitAPI
 * @author Demian <devaccdemiann@gmail.com>
 * @description A Node.js wrapper for the faceit data api with only one dependency. For more accurate up to date documentation visit https://developers.faceit.com/docs/tools/data-api
 * @example
 *     const FaceitAPI = require('wrapper');
 *     const client = new FaceitAPI();
 * @public
 * @version 1.0.0
 * @license MIT
 */
class FaceitAPI {
  /**
   * @param {string} apiKey Authorization key
   */
  constructor(apiKey) {
    this.apiKey = apiKey;
  }

  async _request(url, options) {
    const key = this.apiKey;
    const headers = {
      Authorization: key,
      'Content-Type': 'application/json',
    };

    return new Promise((resolve, reject) => {
      if (!key) return new Error('Please supply an api key.');

      fetch(Constants.BaseURL + url, { ...options, ...headers })
        .then((res) => res.json())
        .then((json) => {
          resolve(json);
        })
        .catch((e) => reject(e));
    });
  }
}

module.exports = FaceitAPI;
/**
 * @description
 * @function championships.all()
 * @param {object} params
 * @returns {Object}
 */
