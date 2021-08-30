const fetch = require('isomorphic-unfetch');

const Utils = require('./utils/utils');
const Constants = require('./utils/constants');

// TODO:: seperate query and path

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
      get championships() {
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

      get hubs() {
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
   * @description Calls related to matches endpoints
   */
  get matches() {
    const endpointPrefix = 'matches';

    return {
      /**
       * @description
       * @function matches.show()
       * @param {object} params
       * @param {string} params.match_id
       * @returns {Object}
       */
      show: (params = {}) => {
        this._defaults(params);

        // Must exists and be string
        if (Utils.isStringEmpty(params.match_id)) Utils._WARN_('Invalid parameter', 'match_id must be of type: String');

        const endpoint = `/${endpointPrefix}/${params.match_id}`;
        const url = this._buildUrl(endpoint, params);

        return this._request(url);
      },

      /**
       * @description
       * @function matches.stats()
       * @param {object} params
       * @param {string} params.match_id
       * @returns {Object}
       */
      stats: (params = {}) => {
        this._defaults(params);

        // Must exists and be string
        if (Utils.isStringEmpty(params.match_id)) Utils._WARN_('Invalid parameter', 'match_id must be of type: String');

        const endpoint = `/${endpointPrefix}/${params.match_id}/stats`;
        const url = this._buildUrl(endpoint, params);

        return this._request(url);
      },
    };
  }

  /**
   * @description Calls related to organizers endpoints
   */
  get organizers() {
    const endpointPrefix = 'organizers';

    return {
      /**
       * @description
       * @function organizers.get()
       * @param {object} params
       * @param {string} params.name
       * @returns {Object}
       */
      get: (params = {}) => {
        this._defaults(params);

        // Must exists and be string
        if (Utils.isStringEmpty(params.name)) Utils._WARN_('Invalid parameter', 'name must be of type: String');

        const endpoint = `/${endpointPrefix}`;
        const url = this._buildUrl(endpoint, params);

        return this._request(url);
      },

      /**
       * @description
       * @function organizers.show()
       * @param {object} params
       * @param {string} params.organizer_id
       * @returns {Object}
       */
      show: (params = {}) => {
        this._defaults(params);

        // Must exists and be string
        if (Utils.isStringEmpty(params.organizer_id))
          Utils._WARN_('Invalid parameter', 'organizer_id  must be of type: String');

        const endpoint = `/${endpointPrefix}/${params.organizer_id}`;
        const url = this._buildUrl(endpoint, params);

        return this._request(url);
      },

      /**
       * @description
       * @function organizers.championships()
       * @param {object} params
       * @param {string} params.organizer_id
       * @param {number} params.offset
       * @param {number} params.limit
       * @returns {Object}
       */
      championships: (params = {}) => {
        this._defaults(params);

        // Must exists and be string
        if (Utils.isStringEmpty(params.organizer_id))
          Utils._WARN_('Invalid parameter', 'organizer_id  must be of type: String');

        const endpoint = `/${endpointPrefix}/${params.organizer_id}/championships`;
        const url = this._buildUrl(endpoint, params);

        return this._request(url);
      },

      /**
       * @description
       * @function organizers.games()
       * @param {object} params
       * @param {string} params.organizer_id
       * @param {number} params.offset
       * @param {number} params.limit
       * @returns {Object}
       */
      games: (params = {}) => {
        this._defaults(params);

        // Must exists and be string
        if (Utils.isStringEmpty(params.organizer_id))
          Utils._WARN_('Invalid parameter', 'organizer_id  must be of type: String');

        const endpoint = `/${endpointPrefix}/${params.organizer_id}/games`;
        const url = this._buildUrl(endpoint, params);

        return this._request(url);
      },

      /**
       * @description
       * @function organizers.hubs()
       * @param {object} params
       * @param {string} params.organizer_id
       * @param {number} params.offset
       * @param {number} params.limit
       * @returns {Object}
       */
      hubs: (params = {}) => {
        this._defaults(params);

        // Must exists and be string
        if (Utils.isStringEmpty(params.organizer_id))
          Utils._WARN_('Invalid parameter', 'organizer_id must be of type: String');

        const endpoint = `/${endpointPrefix}/${params.organizer_id}/hubs`;
        const url = this._buildUrl(endpoint, params);

        return this._request(url);
      },

      /**
       * @description
       * @function organizers.tournaments()
       * @param {object} params
       * @param {string} params.organizer_id
       * @param {string} params.type
       * @param {number} params.offset
       * @param {number} params.limit
       * @returns {Object}
       */
      tournaments: (params = {}) => {
        this._defaults(params);

        // Must exists and be string
        if (Utils.isStringEmpty(params.organizer_id))
          Utils._WARN_('Invalid parameter', 'organizer_id must be of type: String');

        const endpoint = `/${endpointPrefix}/${params.organizer_id}/tournaments`;
        const url = this._buildUrl(endpoint, params);

        return this._request(url);
      },
    };
  }

  /**
   * @description Calls related to players endpoints
   */
  get players() {
    const endpointPrefix = 'players';

    return {
      /**
       * @description
       * @function players.get()
       * @param {object} params
       * @param {string} params.nickname
       * @param {string} params.game
       * @param {string} params.game_player_id
       * @returns {Object}
       */
      get: (params = {}) => {
        this._defaults(params);

        const endpoint = `/${endpointPrefix}`;
        const url = this._buildUrl(endpoint, params);

        return this._request(url);
      },

      /**
       * @description
       * @function players.show()
       * @param {object} params
       * @param {string} params.player_id
       * @returns {Object}
       */
      show: (params = {}) => {
        this._defaults(params);

        // Must exists and be string
        if (Utils.isStringEmpty(params.player_id)) Utils._WARN_('Invalid parameter', 'player_id  must be of type: String');

        const endpoint = `/${endpointPrefix}/${params.player_id}`;
        const url = this._buildUrl(endpoint, params);

        return this._request(url);
      },

      /**
       * @description
       * @function players.history()
       * @param {object} params
       * @param {string} params.player_id
       * @param {string} params.game
       * @param {number} params.from
       * @param {number} params.to
       * @param {number} params.offset
       * @param {number} params.limit
       * @returns {Object}
       */
      history: (params = {}) => {
        this._defaults(params);

        // Must exists and be string
        if (Utils.isStringEmpty(params.player_id)) Utils._WARN_('Invalid parameter', 'player_id  must be of type: String');

        // If exists be String
        if ('from' in params && !Utils.isNumber(params.from))
          Utils._WARN_('Invalid parameter', 'from must be of type: String');
        if ('to' in params && !Utils.isNumber(params.to)) Utils._WARN_('Invalid parameter', 'to must be of type: String');

        const endpoint = `/${endpointPrefix}/${params.player_id}/history`;
        const url = this._buildUrl(endpoint, params);

        return this._request(url);
      },

      /**
       * @description
       * @function players.hubs()
       * @param {object} params
       * @param {string} params.player_id
       * @param {number} params.offset
       * @param {number} params.limit
       * @returns {Object}
       */
      hubs: (params = {}) => {
        this._defaults(params);

        // Must exists and be string
        if (Utils.isStringEmpty(params.player_id)) Utils._WARN_('Invalid parameter', 'player_id  must be of type: String');

        const endpoint = `/${endpointPrefix}/${params.player_id}/hubs`;
        const url = this._buildUrl(endpoint, params);

        return this._request(url);
      },

      /**
       * @description
       * @function organizers.stats()
       * @param {object} params
       * @param {string} params.player_id
       * @param {string} params.game_id
       * @returns {Object}
       */
      stats: (params = {}) => {
        this._defaults(params);

        // Must exists and be string
        if (Utils.isStringEmpty(params.player_id)) Utils._WARN_('Invalid parameter', 'player_id must be of type: String');

        // Must exists and be string
        if (Utils.isStringEmpty(params.game_id)) Utils._WARN_('Invalid parameter', 'game_id must be of type: String');

        const endpoint = `/${endpointPrefix}/${params.player_id}/stats/${params.game_id}`;
        const url = this._buildUrl(endpoint, params);

        return this._request(url);
      },

      /**
       * @description
       * @function players.tournaments()
       * @param {object} params
       * @param {string} params.player_id
       * @param {number} params.offset
       * @param {number} params.limit
       * @returns {Object}
       */
      tournaments: (params = {}) => {
        this._defaults(params);

        // Must exists and be string
        if (Utils.isStringEmpty(params.player_id)) Utils._WARN_('Invalid parameter', 'player_id must be of type: String');

        const endpoint = `/${endpointPrefix}/${params.player_id}/tournaments`;
        const url = this._buildUrl(endpoint, params);

        return this._request(url);
      },
    };
  }

  /**
   * @description Calls related to rankings endpoints
   */
  get rankings() {
    const endpointPrefix = 'rankings';

    return {
      /**
       * @description
       * @function players.game()
       * @param {object} params
       * @param {string} params.game_id
       * @param {string} params.region
       * @param {string} params.country
       * @param {number} params.offset
       * @param {number} params.limit
       * @returns {Object}
       */
      game: (params = {}) => {
        this._defaults(params);

        // Must exists and be string
        if (Utils.isStringEmpty(params.game_id)) Utils._WARN_('Invalid parameter', 'game_id must be of type: String');

        // Must exists and be string
        if (Utils.isStringEmpty(params.region)) Utils._WARN_('Invalid parameter', 'region must be of type: String');

        // Must exists and be string
        if ('country' in params && Utils.isStringEmpty(params.country))
          Utils._WARN_('Invalid parameter', 'country must be of type: String');

        const endpoint = `/${endpointPrefix}/games/${params.game_id}/regions/${params.region}`;
        const url = this._buildUrl(endpoint, params);

        return this._request(url);
      },

      /**
       * @description
       * @function players.player()
       * @param {object} params
       * @param {string} params.game_id
       * @param {string} params.region
       * @param {string} params.player_id
       * @param {string} params.country
       * @param {number} params.limit
       * @returns {Object}
       */
      player: (params = {}) => {
        this._defaults(params);

        // Must exists and be string
        if (Utils.isStringEmpty(params.game_id)) Utils._WARN_('Invalid parameter', 'game_id must be of type: String');

        // Must exists and be string
        if (Utils.isStringEmpty(params.region)) Utils._WARN_('Invalid parameter', 'region must be of type: String');

        // Must exists and be string
        if (Utils.isStringEmpty(params.player_id)) Utils._WARN_('Invalid parameter', 'player_id must be of type: String');

        // Must exists and be string
        if ('country' in params && Utils.isStringEmpty(params.country))
          Utils._WARN_('Invalid parameter', 'country must be of type: String');

        const endpoint = `/${endpointPrefix}/games/${params.game_id}/regions/${params.region}/players/${params.player_id}`;
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

    // If exists be String
    if ('type' in params && !Utils.isString(params.type)) Utils._WARN_('Invalid parameter', 'type must be of type: String');

    // If exists be String
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
