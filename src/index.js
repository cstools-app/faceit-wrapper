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
   * @description Calls related to championships endpoints
   */
  get championships() {
    const endpointPrefix = 'championships';

    return {
      /**
       * @description
       * @function championships.all()
       * @param {object} params
       * @param {string} params.game
       * @param {string} params.type
       * @param {number} params.offset
       * @param {number} params.limit
       * @returns {Object}
       */
      all: (params = {}) => {
        this._defaults(params);

        // Must exists and be string
        if (Utils.isStringEmpty(params.game)) Utils._WARN_('Invalid parameter', 'game must be of type: String');

        const endpoint = `/${endpointPrefix}`;
        const url = this._buildUrl(endpoint, params);

        return this._request(url);
      },

      /**
       * @description
       * @function championships.show()
       * @param {object} params
       * @param {string} params.championship_id
       * @param {array[string]} params.expanded
       * @returns {Object}
       */
      show: (params = {}) => {
        this._defaults(params);

        // Must exists and be string
        if (Utils.isStringEmpty(params.championship_id))
          Utils._WARN_('Invalid parameter', 'championship_id must be of type: String');

        // Must exists and be array
        if ('expanded' in params && !Utils.isArray(params.expanded))
          Utils._WARN_('Invalid parameter', 'expanded must be of type: Array[String]');

        const endpoint = `/${endpointPrefix}/${params.championship_id}`;
        const url = this._buildUrl(endpoint, params);

        return this._request(url);
      },

      /**
       * @description
       * @function championships.matches()
       * @param {object} params
       * @param {string} params.championship_id
       * @param {string} params.type
       * @param {number} params.offset
       * @param {number} params.limit
       * @returns {Object}
       */
      matches: (params = {}) => {
        this._defaults(params);

        // Must exists and be string
        if (Utils.isStringEmpty(params.championship_id))
          Utils._WARN_('Invalid parameter', 'championship_id must be of type: String');

        const endpoint = `/${endpointPrefix}/${params.championship_id}/matches`;
        const url = this._buildUrl(endpoint, params);

        return this._request(url);
      },

      /**
       * @description
       * @function championships.subscriptions()
       * @param {object} params
       * @param {string} params.championship_id
       * @param {string} params.type
       * @param {number} params.offset
       * @param {number} params.limit
       * @returns {Object}
       */
      subscriptions: (params = {}) => {
        this._defaults(params);

        // Must exists and be string
        if (Utils.isStringEmpty(params.championship_id))
          Utils._WARN_('Invalid parameter', 'championship_id must be of type: String');

        const endpoint = `/${endpointPrefix}/${params.championship_id}/subscriptions`;
        const url = this._buildUrl(endpoint, params);

        return this._request(url);
      },
    };
  }

  /**
   * @description Calls related to games endpoints
   */
  get games() {
    const endpointPrefix = 'games';

    return {
      /**
       * @description
       * @function games.all()
       * @param {object} params
       * @param {number} params.offset
       * @param {number} params.limit
       * @returns {Object}
       */
      all: (params = {}) => {
        this._defaults(params);

        const endpoint = `/${endpointPrefix}`;
        const url = this._buildUrl(endpoint, params);

        return this._request(url);
      },

      /**
       * @description
       * @function games.show()
       * @param {object} params
       * @param {string} params.game_id
       * @returns {Object}
       */
      show: (params = {}) => {
        this._defaults(params);

        // Must exists and be string
        if (Utils.isStringEmpty(params.game_id)) Utils._WARN_('Invalid parameter', 'game_id must be of type: String');

        const endpoint = `/${endpointPrefix}/${params.game_id}`;
        const url = this._buildUrl(endpoint, params);

        return this._request(url);
      },

      /**
       * @description
       * @function games.parent()
       * @param {object} params
       * @param {string} params.game_id
       * @returns {Object}
       */
      parent: (params = {}) => {
        this._defaults(params);

        // Must exists and be string
        if (Utils.isStringEmpty(params.game_id)) Utils._WARN_('Invalid parameter', 'game_id must be of type: String');

        const endpoint = `/${endpointPrefix}/${params.game_id}/parent`;
        const url = this._buildUrl(endpoint, params);

        return this._request(url);
      },
    };
  }

  /**
   * @description Calls related to hubs endpoints
   */
  get hubs() {
    const endpointPrefix = 'hubs';

    return {
      /**
       * @description
       * @function hubs.show()
       * @param {object} params
       * @param {string} params.hub_id
       * @param {array[string]} params.expanded
       * @returns {Object}
       */
      show: (params = {}) => {
        this._defaults(params);

        // Must exists and be string
        if (Utils.isStringEmpty(params.hub_id)) Utils._WARN_('Invalid parameter', 'hub_id must be of type: String');

        // Must exists and be array
        if ('expanded' in params && !Utils.isArray(params.expanded))
          Utils._WARN_('Invalid parameter', 'expanded must be of type: Array[String]');

        const endpoint = `/${endpointPrefix}/${params.hub_id}`;
        const url = this._buildUrl(endpoint, params);

        return this._request(url);
      },

      /**
       * @description
       * @function hubs.matches()
       * @param {object} params
       * @param {string} params.hub_id
       * @param {string} params.type
       * @param {number} params.offset
       * @param {number} params.limit
       * @returns {Object}
       */
      matches: (params = {}) => {
        this._defaults(params);

        // Must exists and be string
        if (Utils.isStringEmpty(params.hub_id)) Utils._WARN_('Invalid parameter', 'hub_id must be of type: String');

        const endpoint = `/${endpointPrefix}/${params.hub_id}/matches`;
        const url = this._buildUrl(endpoint, params);

        return this._request(url);
      },

      /**
       * @description
       * @function hubs.members()
       * @param {object} params
       * @param {string} params.hub_id
       * @param {number} params.offset
       * @param {number} params.limit
       * @returns {Object}
       */
      members: (params = {}) => {
        this._defaults(params);

        // Must exists and be string
        if (Utils.isStringEmpty(params.hub_id)) Utils._WARN_('Invalid parameter', 'hub_id must be of type: String');

        const endpoint = `/${endpointPrefix}/${params.hub_id}/members`;
        const url = this._buildUrl(endpoint, params);

        return this._request(url);
      },

      /**
       * @description
       * @function hubs.roles()
       * @param {object} params
       * @param {string} params.hub_id
       * @param {number} params.offset
       * @param {number} params.limit
       * @returns {Object}
       */
      roles: (params = {}) => {
        this._defaults(params);

        // Must exists and be string
        if (Utils.isStringEmpty(params.hub_id)) Utils._WARN_('Invalid parameter', 'hub_id must be of type: String');

        const endpoint = `/${endpointPrefix}/${params.hub_id}/roles`;
        const url = this._buildUrl(endpoint, params);

        return this._request(url);
      },

      /**
       * @description
       * @function hubs.rules()
       * @param {object} params
       * @param {string} params.hub_id
       * @returns {Object}
       */
      rules: (params = {}) => {
        this._defaults(params);

        // Must exists and be string
        if (Utils.isStringEmpty(params.hub_id)) Utils._WARN_('Invalid parameter', 'hub_id must be of type: String');

        const endpoint = `/${endpointPrefix}/${params.hub_id}/rules`;
        const url = this._buildUrl(endpoint, params);

        return this._request(url);
      },

      /**
       * @description
       * @function hubs.stats()
       * @param {object} params
       * @param {string} params.hub_id
       * @param {number} params.offset
       * @param {number} params.limit
       * @returns {Object}
       */
      stats: (params = {}) => {
        this._defaults(params);

        // Must exists and be string
        if (Utils.isStringEmpty(params.hub_id)) Utils._WARN_('Invalid parameter', 'hub_id must be of type: String');

        const endpoint = `/${endpointPrefix}/${params.hub_id}/stats`;
        const url = this._buildUrl(endpoint, params);

        return this._request(url);
      },
    };
  }

  /**
   * @description Calls related to leaderboards endpoints
   */
  get leaderboards() {
    const endpointPrefix = 'leaderboards';
    const championshipsPrefix = 'championships';
    const groupsPrefix = 'groups';
    const hubsPrefix = 'hubs';
    const seasonsPrefix = 'seasons';

    return {
      championships: () => {
        return {
          /**
           * @description
           * @function leaderboards.championships.show()
           * @param {object} params
           * @param {string} params.championship_id
           * @param {number} params.offset
           * @param {number} params.limit
           * @returns {Object}
           */
          show: (params = {}) => {
            this._defaults(params);

            // Must exists and be string
            if (Utils.isStringEmpty(params.championship_id))
              Utils._WARN_('Invalid parameter', 'championship_id must be of type: String');

            const endpoint = `/${endpointPrefix}/${championshipsPrefix}/${params.championship_id}`;
            const url = this._buildUrl(endpoint, params);

            return this._request(url);
          },

          /**
           * @description
           * @function leaderboards.championships.group()
           * @param {object} params
           * @param {string} params.championship_id
           * @param {string} params.group_id
           * @param {number} params.offset
           * @param {number} params.limit
           * @returns {Object}
           */
          group: (params = {}) => {
            this._defaults(params);

            // Must exists and be string
            if (Utils.isStringEmpty(params.championship_id))
              Utils._WARN_('Invalid parameter', 'championship_id must be of type: String');

            // Must exists and be string
            if (Utils.isStringEmpty(params.group_id)) Utils._WARN_('Invalid parameter', 'group_id must be of type: String');

            const endpoint = `/${endpointPrefix}/${championshipsPrefix}/${params.championship_id}/${groupsPrefix}/${params.group_id}`;
            const url = this._buildUrl(endpoint, params);

            return this._request(url);
          },
        };
      },

      hubs: () => {
        return {
          /**
           * @description
           * @function leaderboards.hubs.show()
           * @param {object} params
           * @param {string} params.hub_id
           * @param {number} params.offset
           * @param {number} params.limit
           * @returns {Object}
           */
          show: (params = {}) => {
            this._defaults(params);

            // Must exists and be string
            if (Utils.isStringEmpty(params.hub_id)) Utils._WARN_('Invalid parameter', 'hub_id must be of type: String');

            const endpoint = `/${endpointPrefix}/${championshipsPrefix}/${params.hub_id}`;
            const url = this._buildUrl(endpoint, params);

            return this._request(url);
          },

          /**
           * @description
           * @function leaderboards.hubs.general()
           * @param {object} params
           * @param {string} params.hub_id
           * @param {number} params.offset
           * @param {number} params.limit
           * @returns {Object}
           */
          general: (params = {}) => {
            this._defaults(params);

            // Must exists and be string
            if (Utils.isStringEmpty(params.hub_id)) Utils._WARN_('Invalid parameter', 'hub_id must be of type: String');

            const endpoint = `/${endpointPrefix}/${hubsPrefix}/${params.hub_id}/general`;
            const url = this._buildUrl(endpoint, params);

            return this._request(url);
          },

          /**
           * @description
           * @function leaderboards.hubs.season()
           * @param {object} params
           * @param {string} params.hub_id
           * @param {string} params.season_id
           * @param {number} params.offset
           * @param {number} params.limit
           * @returns {Object}
           */
          season: (params = {}) => {
            this._defaults(params);

            // Must exists and be string
            if (Utils.isStringEmpty(params.hub_id)) Utils._WARN_('Invalid parameter', 'hub_id must be of type: String');

            // Must exists and be string
            if (Utils.isStringEmpty(params.season_id))
              Utils._WARN_('Invalid parameter', 'season_id must be of type: String');

            const endpoint = `/${endpointPrefix}/${hubsPrefix}/${params.hub_id}/${seasonsPrefix}/${params.season_id}`;
            const url = this._buildUrl(endpoint, params);

            return this._request(url);
          },
        };
      },

      /**
       * @description
       * @function leaderboards.show()
       * @param {object} params
       * @param {string} params.leaderboard_id
       * @param {array[string]} params.expanded
       * @param {number} params.offset
       * @param {number} params.limit
       * @returns {Object}
       */
      show: (params = {}) => {
        this._defaults(params);

        // Must exists and be string
        if (Utils.isStringEmpty(params.leaderboard_id))
          Utils._WARN_('Invalid parameter', 'leaderboard_id must be of type: String');

        const endpoint = `/${endpointPrefix}/${params.leaderboard_id}`;
        const url = this._buildUrl(endpoint, params);

        return this._request(url);
      },
    };
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

    // Must exists and be String
    if ('type' in params && !Utils.isString(params.type)) Utils._WARN_('Invalid parameter', 'type must be of type: String');

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
    const base = `${Constants.BaseURL}${endpoint}`;

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