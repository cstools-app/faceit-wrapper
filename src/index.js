const fetch = require('isomorphic-unfetch');

const Utils = require('./utils/utils');
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

  /**
   * @description Checks the default parameters
   * @function _defaults()
   * @param {object} params
   * @param {number} params.offset
   * @param {number} params.limit
   * @returns {Object}
   */
  _defaults(params) {
    // Must be object
    if (!Utils.isObject(params)) Utils._WARN_('Invalid parameter', 'params must be of type: Object');

    // Must be Number
    if ('offset' in params && !Utils.isNumber(params.type))
      Utils._WARN_('Invalid parameter', 'offset must be of type: Number');
    if ('limit' in params && !Utils.isNumber(params.type))
      Utils._WARN_('Invalid parameter', 'limit must be of type: Number');
  }

  /**
   * @description Formats object into http query
   * @function _buildQuery()
   * @param {string} url
   * @param {object} query
   * @returns {string}
   */
  _buildQuery(query) {
    return Object.entries(query)
      .map((pair) => pair.map(encodeURIComponent).join('='))
      .join('&');
  }

  /**
   * @description Formats endpoint and params into a url
   * @function _buildQuery()
   * @param {string} endpoint
   * @param {object} params
   * @returns {string}
   */
  _buildUrl(endpoint, params) {
    const query = this._buildQuery(params);
    const base = `${Constants.BaseURL}/${endpoint}`;

    return query ? `${base}?${query}` : base;
  }

  async _request(url, options) {
    const key = this.apiKey;
    const headers = {
      Authorization: key,
      'Content-Type': 'application/json',
    };

    return new Promise((resolve, reject) => {
      if (!key) {
        reject(new Error('api key must be supplied'));
      }

      fetch(url, { ...options, ...headers })
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
