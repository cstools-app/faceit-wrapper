const fetch = require('isomorphic-unfetch');
const _ = require('lodash');

const Utils = require('./helpers/utils');
const Constants = require('./helpers/constants');

// TODO:: Request returns promise, update comments

/**
 * @class FaceitAPI
 * @author Demian <devaccdemiann@gmail.com>
 * @description A Node.js faceit-wrapper for the faceit data api with only two dependencies. For more accurate and up to date documentation visit https://developers.faceit.com/docs/tools/data-api
 * @example
 *     const FaceitAPI = require('@cstools-app/faceit-wrapper');
 *     const client = new FaceitAPI();
 * @public
 * @version 0.0.2
 * @license MIT
 */
class FaceitAPI {
  /**
   * @param {String} apiKey Authorization key
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
       * @description Retrieve all championships of a game
       * @function championships.all()
       * @param {Object} params
       * @param {String} params.game
       * @param {String} params.type
       * @param {Number} params.offset
       * @param {Number} params.limit
       * @returns {Promise}
       */
      all: (params = {}) => {
        this._defaults(params);

        // Must exists and be String
        if (Utils.isStringEmpty(params.game)) throw new TypeError('game must be of type: String');

        const endpoint = `/${endpointPrefix}`;
        const url = this._buildUrl(endpoint, {});

        return this._request(url);
      },

      /**
       * @description Retrieve championship details
       * @function championships.show()
       * @param {Object} params
       * @param {String} params.championship_id
       * @param {Array[String]} params.expanded
       * @returns {Promise}
       */
      show: (params = {}) => {
        this._defaults(params);

        // Must exists and be String
        if (Utils.isStringEmpty(params.championship_id)) throw new TypeError('championship_id must be of type: String');

        const query = _.pick(params, ['expanded']);

        const endpoint = `/${endpointPrefix}/${params.championship_id}`;
        const url = this._buildUrl(endpoint, query);

        return this._request(url);
      },

      /**
       * @description Retrieve all matches of a championship
       * @function championships.matches()
       * @param {Object} params
       * @param {String} params.championship_id
       * @param {String} params.type
       * @param {Number} params.offset
       * @param {Number} params.limit
       * @returns {Promise}
       */
      matches: (params = {}) => {
        this._defaults(params);

        // Must exists and be String
        if (Utils.isStringEmpty(params.championship_id)) throw new TypeError('championship_id must be of type: String');

        const query = _.pick(params, ['type', 'offset', 'limit']);

        const endpoint = `/${endpointPrefix}/${params.championship_id}/matches`;
        const url = this._buildUrl(endpoint, query);

        return this._request(url);
      },

      /**
       * @description Retrieve all subscriptions of a championship
       * @function championships.subscriptions()
       * @param {Object} params
       * @param {String} params.championship_id
       * @param {String} params.type
       * @param {Number} params.offset
       * @param {Number} params.limit
       * @returns {Promise}
       */
      subscriptions: (params = {}) => {
        this._defaults(params);

        // Must exists and be String
        if (Utils.isStringEmpty(params.championship_id)) throw new TypeError('championship_id must be of type: String');

        const query = _.pick(params, ['offset', 'limit']);

        const endpoint = `/${endpointPrefix}/${params.championship_id}/subscriptions`;
        const url = this._buildUrl(endpoint, query);

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
       * @description Retrieve details of all games on FACEIT
       * @function games.all()
       * @param {Object} params
       * @param {Number} params.offset
       * @param {Number} params.limit
       * @returns {Promise}
       */
      all: (params = {}) => {
        this._defaults(params);

        const endpoint = `/${endpointPrefix}`;
        const url = this._buildUrl(endpoint, {});

        return this._request(url);
      },

      /**
       * @description Retrieve game details
       * @function games.show()
       * @param {Object} params
       * @param {String} params.game_id
       * @returns {Promise}
       */
      show: (params = {}) => {
        this._defaults(params);

        // Must exists and be String
        if (Utils.isStringEmpty(params.game_id)) throw new TypeError('game_id must be of type: String');

        const endpoint = `/${endpointPrefix}/${params.game_id}`;
        const url = this._buildUrl(endpoint, {});

        return this._request(url);
      },

      /**
       * @description Retrieve the details of the parent game, if the game is region-specific
       * @function games.parent()
       * @param {Object} params
       * @param {String} params.game_id
       * @returns {Promise}
       */
      parent: (params = {}) => {
        this._defaults(params);

        // Must exists and be String
        if (Utils.isStringEmpty(params.game_id)) throw new TypeError('game_id must be of type: String');

        const endpoint = `/${endpointPrefix}/${params.game_id}/parent`;
        const url = this._buildUrl(endpoint, {});

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
       * @description Retrieve hub details
       * @function hubs.show()
       * @param {Object} params
       * @param {String} params.hub_id
       * @param {Array[String]} params.expanded
       * @returns {Promise}
       */
      show: (params = {}) => {
        this._defaults(params);

        // Must exists and be String
        if (Utils.isStringEmpty(params.hub_id)) throw new TypeError('hub_id must be of type: String');

        const query = _.pick(params, ['expanded']);

        const endpoint = `/${endpointPrefix}/${params.hub_id}`;
        const url = this._buildUrl(endpoint, query);

        return this._request(url);
      },

      /**
       * @description REtrieve all matches of a hub
       * @function hubs.matches()
       * @param {Object} params
       * @param {String} params.hub_id
       * @param {String} params.type
       * @param {Number} params.offset
       * @param {Number} params.limit
       * @returns {Promise}
       */
      matches: (params = {}) => {
        this._defaults(params);

        // Must exists and be String
        if (Utils.isStringEmpty(params.hub_id)) throw new TypeError('hub_id must be of type: String');

        const query = _.pick(params, ['type', 'offset', 'limit']);

        const endpoint = `/${endpointPrefix}/${params.hub_id}/matches`;
        const url = this._buildUrl(endpoint, query);

        return this._request(url);
      },

      /**
       * @description REtrieve all members of a hub
       * @function hubs.members()
       * @param {Object} params
       * @param {String} params.hub_id
       * @param {Number} params.offset
       * @param {Number} params.limit
       * @returns {Promise}
       */
      members: (params = {}) => {
        this._defaults(params);

        // Must exists and be String
        if (Utils.isStringEmpty(params.hub_id)) throw new TypeError('hub_id must be of type: String');

        const query = _.pick(params, ['offset', 'limit']);

        const endpoint = `/${endpointPrefix}/${params.hub_id}/members`;
        const url = this._buildUrl(endpoint, query);

        return this._request(url);
      },

      /**
       * @description Retrieve all roles members can have in a hub
       * @function hubs.roles()
       * @param {Object} params
       * @param {String} params.hub_id
       * @param {Number} params.offset
       * @param {Number} params.limit
       * @returns {Promise}
       */
      roles: (params = {}) => {
        this._defaults(params);

        // Must exists and be String
        if (Utils.isStringEmpty(params.hub_id)) throw new TypeError('hub_id must be of type: String');

        const query = _.pick(params, ['offset', 'limit']);

        const endpoint = `/${endpointPrefix}/${params.hub_id}/roles`;
        const url = this._buildUrl(endpoint, query);

        return this._request(url);
      },

      /**
       * @description Retrieve rules of a hub
       * @function hubs.rules()
       * @param {Object} params
       * @param {String} params.hub_id
       * @returns {Promise}
       */
      rules: (params = {}) => {
        this._defaults(params);

        // Must exists and be String
        if (Utils.isStringEmpty(params.hub_id)) throw new TypeError('hub_id must be of type: String');

        const endpoint = `/${endpointPrefix}/${params.hub_id}/rules`;
        const url = this._buildUrl(endpoint, {});

        return this._request(url);
      },

      /** Retrieve statistics of a hub
       * @description
       * @function hubs.stats()
       * @param {Object} params
       * @param {String} params.hub_id
       * @param {Number} params.offset
       * @param {Number} params.limit
       * @returns {Promise}
       */
      stats: (params = {}) => {
        this._defaults(params);

        // Must exists and be String
        if (Utils.isStringEmpty(params.hub_id)) throw new TypeError('hub_id must be of type: String');

        const query = _.pick(params, ['offset', 'limit']);

        const endpoint = `/${endpointPrefix}/${params.hub_id}/stats`;
        const url = this._buildUrl(endpoint, query);

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
           * @description Retrieve all leaderboards of a championship
           * @function leaderboards.championships.show()
           * @param {Object} params
           * @param {String} params.championship_id
           * @param {Number} params.offset
           * @param {Number} params.limit
           * @returns {Promise}
           */
          show: (params = {}) => {
            this._defaults(params);

            // Must exists and be String
            if (Utils.isStringEmpty(params.championship_id)) throw new TypeError('championship_id must be of type: String');

            const query = _.pick(params, ['offset', 'limit']);

            const endpoint = `/${endpointPrefix}/${championshipsPrefix}/${params.championship_id}`;
            const url = this._buildUrl(endpoint, query);

            return this._request(url);
          },

          /**
           * @description Retrieve group ranking of a championship
           * @function leaderboards.championships.group()
           * @param {Object} params
           * @param {String} params.championship_id
           * @param {String} params.group_id
           * @param {Number} params.offset
           * @param {Number} params.limit
           * @returns {Promise}
           */
          group: (params = {}) => {
            this._defaults(params);

            // Must exists and be String
            if (Utils.isStringEmpty(params.championship_id)) throw new TypeError('championship_id must be of type: String');

            // Must exists and be String
            if (Utils.isStringEmpty(params.group_id)) throw new TypeError('group_id must be of type: String');

            const query = _.pick(params, ['offset', 'limit']);

            const endpoint = `/${endpointPrefix}/${championshipsPrefix}/${params.championship_id}/${groupsPrefix}/${params.group_id}`;
            const url = this._buildUrl(endpoint, query);

            return this._request(url);
          },
        };
      },

      get hubs() {
        return {
          /**
           * @description Retrieve all leaderboards of a hub
           * @function leaderboards.hubs.show()
           * @param {Object} params
           * @param {String} params.hub_id
           * @param {Number} params.offset
           * @param {Number} params.limit
           * @returns {Promise}
           */
          show: (params = {}) => {
            this._defaults(params);

            // Must exists and be String
            if (Utils.isStringEmpty(params.hub_id)) throw new TypeError('hub_id must be of type: String');

            const query = _.pick(params, ['offset', 'limit']);

            const endpoint = `/${endpointPrefix}/${championshipsPrefix}/${params.hub_id}`;
            const url = this._buildUrl(endpoint, query);

            return this._request(url);
          },

          /**
           * @description Retrieve all time ranking of a hub
           * @function leaderboards.hubs.general()
           * @param {Object} params
           * @param {String} params.hub_id
           * @param {Number} params.offset
           * @param {Number} params.limit
           * @returns {Promise}
           */
          general: (params = {}) => {
            this._defaults(params);

            // Must exists and be String
            if (Utils.isStringEmpty(params.hub_id)) throw new TypeError('hub_id must be of type: String');

            const query = _.pick(params, ['offset', 'limit']);

            const endpoint = `/${endpointPrefix}/${hubsPrefix}/${params.hub_id}/general`;
            const url = this._buildUrl(endpoint, query);

            return this._request(url);
          },

          /**
           * @description Retrieve seasonal ranking of a hub
           * @function leaderboards.hubs.season()
           * @param {Object} params
           * @param {String} params.hub_id
           * @param {String} params.season_id
           * @param {Number} params.offset
           * @param {Number} params.limit
           * @returns {Promise}
           */
          season: (params = {}) => {
            this._defaults(params);

            // Must exists and be String
            if (Utils.isStringEmpty(params.hub_id)) throw new TypeError('hub_id must be of type: String');

            // Must exists and be String
            if (Utils.isStringEmpty(params.season_id)) throw new TypeError('season_id must be of type: String');

            const query = _.pick(params, ['offset', 'limit']);

            const endpoint = `/${endpointPrefix}/${hubsPrefix}/${params.hub_id}/${seasonsPrefix}/${params.season_id}`;
            const url = this._buildUrl(endpoint, query);

            return this._request(url);
          },
        };
      },

      /**
       * @description Retrieve ranking from a leaderboard id
       * @function leaderboards.show()
       * @param {Object} params
       * @param {String} params.leaderboard_id
       * @param {Array[String]} params.expanded
       * @param {Number} params.offset
       * @param {Number} params.limit
       * @returns {Promise}
       */
      show: (params = {}) => {
        this._defaults(params);

        // Must exists and be String
        if (Utils.isStringEmpty(params.leaderboard_id)) throw new TypeError('leaderboard_id must be of type: String');

        const query = _.pick(params, ['offset', 'limit']);

        const endpoint = `/${endpointPrefix}/${params.leaderboard_id}`;
        const url = this._buildUrl(endpoint, query);

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
       * @description Retrieve match details
       * @function matches.show()
       * @param {Object} params
       * @param {String} params.match_id
       * @returns {Promise}
       */
      show: (params = {}) => {
        this._defaults(params);

        // Must exists and be String
        if (Utils.isStringEmpty(params.match_id)) throw new TypeError('match_id must be of type: String');

        const endpoint = `/${endpointPrefix}/${params.match_id}`;
        const url = this._buildUrl(endpoint, {});

        return this._request(url);
      },

      /**
       * @description Retrieve statistics of a match
       * @function matches.stats()
       * @param {Object} params
       * @param {String} params.match_id
       * @returns {Promise}
       */
      stats: (params = {}) => {
        this._defaults(params);

        // Must exists and be String
        if (Utils.isStringEmpty(params.match_id)) throw new TypeError('match_id must be of type: String');

        const endpoint = `/${endpointPrefix}/${params.match_id}/stats`;
        const url = this._buildUrl(endpoint, {});

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
       * @description Retrieve organizer details from name
       * @function organizers.get()
       * @param {Object} params
       * @param {String} params.name
       * @returns {Promise}
       */
      get: (params = {}) => {
        this._defaults(params);

        // Must exists and be String
        if (Utils.isStringEmpty(params.name)) throw new TypeError('name must be of type: String');

        const endpoint = `/${endpointPrefix}`;
        const url = this._buildUrl(endpoint, {});

        return this._request(url);
      },

      /**
       * @description Retrieve organizer details
       * @function organizers.show()
       * @param {Object} params
       * @param {String} params.organizer_id
       * @returns {Promise}
       */
      show: (params = {}) => {
        this._defaults(params);

        // Must exists and be String
        if (Utils.isStringEmpty(params.organizer_id)) throw new TypeError('organizer_id  must be of type: String');

        const endpoint = `/${endpointPrefix}/${params.organizer_id}`;
        const url = this._buildUrl(endpoint, {});

        return this._request(url);
      },

      /**
       * @description Retrieve all championships of an organizer
       * @function organizers.championships()
       * @param {Object} params
       * @param {String} params.organizer_id
       * @param {Number} params.offset
       * @param {Number} params.limit
       * @returns {Promise}
       */
      championships: (params = {}) => {
        this._defaults(params);

        // Must exists and be String
        if (Utils.isStringEmpty(params.organizer_id)) throw new TypeError('organizer_id  must be of type: String');

        const query = _.pick(params, ['offset', 'limit']);

        const endpoint = `/${endpointPrefix}/${params.organizer_id}/championships`;
        const url = this._buildUrl(endpoint, query);

        return this._request(url);
      },

      /**
       * @description Retrieve all games an organizer is involved with
       * @function organizers.games()
       * @param {Object} params
       * @param {String} params.organizer_id
       * @param {Number} params.offset
       * @param {Number} params.limit
       * @returns {Promise}
       */
      games: (params = {}) => {
        this._defaults(params);

        // Must exists and be String
        if (Utils.isStringEmpty(params.organizer_id)) throw new TypeError('organizer_id  must be of type: String');

        const endpoint = `/${endpointPrefix}/${params.organizer_id}/games`;
        const url = this._buildUrl(endpoint, {});

        return this._request(url);
      },

      /**
       * @description Retrieve all hubs of an organizer
       * @function organizers.hubs()
       * @param {Object} params
       * @param {String} params.organizer_id
       * @param {Number} params.offset
       * @param {Number} params.limit
       * @returns {Promise}
       */
      hubs: (params = {}) => {
        this._defaults(params);

        // Must exists and be String
        if (Utils.isStringEmpty(params.organizer_id)) throw new TypeError('organizer_id must be of type: String');

        const query = _.pick(params, ['offset', 'limit']);

        const endpoint = `/${endpointPrefix}/${params.organizer_id}/hubs`;
        const url = this._buildUrl(endpoint, query);

        return this._request(url);
      },

      /**
       * @description Retrieve all tournaments of an organizer
       * @function organizers.tournaments()
       * @param {Object} params
       * @param {String} params.organizer_id
       * @param {String} params.type
       * @param {Number} params.offset
       * @param {Number} params.limit
       * @returns {Promise}
       */
      tournaments: (params = {}) => {
        this._defaults(params);

        // Must exists and be String
        if (Utils.isStringEmpty(params.organizer_id)) throw new TypeError('organizer_id must be of type: String');

        const query = _.pick(params, ['type', 'offset', 'limit']);

        const endpoint = `/${endpointPrefix}/${params.organizer_id}/tournaments`;
        const url = this._buildUrl(endpoint, query);

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
       * @description Retrieve player details
       * @function players.get()
       * @param {Object} params
       * @param {String} params.nickname
       * @param {String} params.game
       * @param {String} params.game_player_id
       * @returns {Promise}
       */
      get: (params = {}) => {
        this._defaults(params);

        const endpoint = `/${endpointPrefix}`;
        const url = this._buildUrl(endpoint, params);

        return this._request(url);
      },

      /**
       * @description Retrieve player details
       * @function players.show()
       * @param {Object} params
       * @param {String} params.player_id
       * @returns {Promise}
       */
      show: (params = {}) => {
        this._defaults(params);

        // Must exists and be String
        if (Utils.isStringEmpty(params.player_id)) throw new TypeError('player_id  must be of type: String');

        const endpoint = `/${endpointPrefix}/${params.player_id}`;
        const url = this._buildUrl(endpoint, {});

        return this._request(url);
      },

      /**
       * @description Retrieve all matches of a player
       * @function players.history()
       * @param {Object} params
       * @param {String} params.player_id
       * @param {String} params.game
       * @param {Number} params.from
       * @param {Number} params.to
       * @param {Number} params.offset
       * @param {Number} params.limit
       * @returns {Promise}
       */
      history: (params = {}) => {
        this._defaults(params);

        // Must exists and be String
        if (Utils.isStringEmpty(params.player_id)) throw new TypeError('player_id  must be of type: String');

        // If exists be String
        if ('from' in params && !Utils.isNumber(params.from)) throw new TypeError('from must be of type: String');
        if ('to' in params && !Utils.isNumber(params.to)) throw new TypeError('to must be of type: String');

        const query = _.pick(params, ['from', 'to', 'offset', 'limit']);

        const endpoint = `/${endpointPrefix}/${params.player_id}/history`;
        const url = this._buildUrl(endpoint, query);

        return this._request(url);
      },

      /**
       * @description Retrieve all hubs of a player
       * @function players.hubs()
       * @param {Object} params
       * @param {String} params.player_id
       * @param {Number} params.offset
       * @param {Number} params.limit
       * @returns {Promise}
       */
      hubs: (params = {}) => {
        this._defaults(params);

        // Must exists and be String
        if (Utils.isStringEmpty(params.player_id)) throw new TypeError('player_id  must be of type: String');

        const query = _.pick(params, ['offset', 'limit']);

        const endpoint = `/${endpointPrefix}/${params.player_id}/hubs`;
        const url = this._buildUrl(endpoint, query);

        return this._request(url);
      },

      /**
       * @description Retrieve statistics of a player
       * @function organizers.stats()
       * @param {Object} params
       * @param {String} params.player_id
       * @param {String} params.game_id
       * @returns {Promise}
       */
      stats: (params = {}) => {
        this._defaults(params);

        // Must exists and be String
        if (Utils.isStringEmpty(params.player_id)) throw new TypeError('player_id must be of type: String');

        // Must exists and be String
        if (Utils.isStringEmpty(params.game_id)) throw new TypeError('game_id must be of type: String');

        const endpoint = `/${endpointPrefix}/${params.player_id}/stats/${params.game_id}`;
        const url = this._buildUrl(endpoint, {});

        return this._request(url);
      },

      /**
       * @description Retrieve all tournaments of a player
       * @function players.tournaments()
       * @param {Object} params
       * @param {String} params.player_id
       * @param {Number} params.offset
       * @param {Number} params.limit
       * @returns {Promise}
       */
      tournaments: (params = {}) => {
        this._defaults(params);

        // Must exists and be String
        if (Utils.isStringEmpty(params.player_id)) throw new TypeError('player_id must be of type: String');

        const query = _.pick(params, ['offset', 'limit']);

        const endpoint = `/${endpointPrefix}/${params.player_id}/tournaments`;
        const url = this._buildUrl(endpoint, query);

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
       * @description Retrieve global ranking of a game
       * @function rankings.game()
       * @param {Object} params
       * @param {String} params.game_id
       * @param {String} params.region
       * @param {String} params.country
       * @param {Number} params.offset
       * @param {Number} params.limit
       * @returns {Promise}
       */
      game: (params = {}) => {
        this._defaults(params);

        // Must exists and be String
        if (Utils.isStringEmpty(params.game_id)) throw new TypeError('game_id must be of type: String');

        // Must exists and be String
        if (Utils.isStringEmpty(params.region)) throw new TypeError('region must be of type: String');

        // Must exists and be String
        if ('country' in params && Utils.isStringEmpty(params.country))
          throw new TypeError('country must be of type: String');

        const query = _.pick(params, ['country', 'offset', 'limit']);

        const endpoint = `/${endpointPrefix}/games/${params.game_id}/regions/${params.region}`;
        const url = this._buildUrl(endpoint, query);

        return this._request(url);
      },

      /**
       * @description Retrieve user position in the global ranking of a game
       * @function rankings.player()
       * @param {Object} params
       * @param {String} params.game_id
       * @param {String} params.region
       * @param {String} params.player_id
       * @param {String} params.country
       * @param {Number} params.limit
       * @returns {Promise}
       */
      player: (params = {}) => {
        this._defaults(params);

        // Must exists and be String
        if (Utils.isStringEmpty(params.game_id)) throw new TypeError('game_id must be of type: String');

        // Must exists and be String
        if (Utils.isStringEmpty(params.region)) throw new TypeError('region must be of type: String');

        // Must exists and be String
        if (Utils.isStringEmpty(params.player_id)) throw new TypeError('player_id must be of type: String');

        // Must exists and be String
        if ('country' in params && Utils.isStringEmpty(params.country))
          throw new TypeError('country must be of type: String');

        const query = _.pick(params, ['country', 'limit']);

        const endpoint = `/${endpointPrefix}/games/${params.game_id}/regions/${params.region}/players/${params.player_id}`;
        const url = this._buildUrl(endpoint, query);

        return this._request(url);
      },
    };
  }

  /**
   * @description Calls related to search endpoints
   */
  get search() {
    const endpointPrefix = 'search';

    return {
      /**
       * @description Search for championships
       * @function search.championships()
       * @param {Object} params
       * @param {String} params.name
       * @param {String} params.game
       * @param {String} params.region
       * @param {String} params.type
       * @param {Number} params.offset
       * @param {Number} params.limit
       * @returns {Promise}
       */
      championships: (params = {}) => {
        this._defaults(params);

        // Must exists and be String
        if (Utils.isStringEmpty(params.name)) throw new TypeError('name must be of type: String');

        // Must exists and be String
        if ('game' in params && Utils.isStringEmpty(params.game)) throw new TypeError('game must be of type: String');

        // Must exists and be String
        if ('region' in params && Utils.isStringEmpty(params.region)) throw new TypeError('region must be of type: String');

        const query = _.pick(params, ['name', 'game', 'region', 'offset', 'limit']);

        const endpoint = `/${endpointPrefix}/championships`;
        const url = this._buildUrl(endpoint, query);

        return this._request(url);
      },

      /**
       * @description Search for hubs
       * @function search.hubs()
       * @param {Object} params
       * @param {String} params.name
       * @param {String} params.game
       * @param {String} params.region
       * @param {Number} params.offset
       * @param {Number} params.limit
       * @returns {Promise}
       */
      hubs: (params = {}) => {
        this._defaults(params);

        // Must exists and be String
        if (Utils.isStringEmpty(params.name)) throw new TypeError('name must be of type: String');

        // Must exists and be String
        if ('game' in params && Utils.isStringEmpty(params.game)) throw new TypeError('game must be of type: String');

        // Must exists and be String
        if ('region' in params && Utils.isStringEmpty(params.region)) throw new TypeError('region must be of type: String');

        const query = _.pick(params, ['name', 'game', 'region', 'offset', 'limit']);

        const endpoint = `/${endpointPrefix}/hubs`;
        const url = this._buildUrl(endpoint, query);

        return this._request(url);
      },

      /**
       * @description Search for organizers
       * @function search.organizers()
       * @param {Object} params
       * @param {String} params.name
       * @param {Number} params.offset
       * @param {Number} params.limit
       * @returns {Promise}
       */
      organizers: (params = {}) => {
        this._defaults(params);

        // Must exists and be String
        if (Utils.isStringEmpty(params.name)) throw new TypeError('name must be of type: String');

        const query = _.pick(params, ['name', 'offset', 'limit']);

        const endpoint = `/${endpointPrefix}/organizers`;
        const url = this._buildUrl(endpoint, query);

        return this._request(url);
      },

      /**
       * @description Search for players
       * @function search.players()
       * @param {Object} params
       * @param {String} params.nickname
       * @param {String} params.game
       * @param {String} params.country
       * @param {Number} params.offset
       * @param {Number} params.limit
       * @returns {Promise}
       */
      players: (params = {}) => {
        this._defaults(params);

        // Must exists and be String
        if (Utils.isStringEmpty(params.nickname)) throw new TypeError('nickname must be of type: String');

        // Must exists and be String
        if ('game' in params && Utils.isStringEmpty(params.game)) throw new TypeError('game must be of type: String');

        // Must exists and be String
        if ('country' in params && Utils.isStringEmpty(params.country))
          throw new TypeError('country must be of type: String');

        const query = _.pick(params, ['nickname', 'country', 'offset', 'limit']);

        const endpoint = `/${endpointPrefix}/players`;
        const url = this._buildUrl(endpoint, query);

        return this._request(url);
      },

      /**
       * @description Search for teams
       * @function search.teams()
       * @param {Object} params
       * @param {String} params.nickname
       * @param {String} params.game
       * @param {Number} params.offset
       * @param {Number} params.limit
       * @returns {Promise}
       */
      teams: (params = {}) => {
        this._defaults(params);

        // Must exists and be String
        if (Utils.isStringEmpty(params.nickname)) throw new TypeError('nickname must be of type: String');

        // Must exists and be String
        if ('game' in params && Utils.isStringEmpty(params.game)) throw new TypeError('game must be of type: String');

        const query = _.pick(params, ['nickname', 'country', 'offset', 'limit']);

        const endpoint = `/${endpointPrefix}/teams`;
        const url = this._buildUrl(endpoint, query);

        return this._request(url);
      },

      /**
       * @description Search for tournaments
       * @function search.tournaments()
       * @param {Object} params
       * @param {String} params.name
       * @param {String} params.game
       * @param {String} params.region
       * @param {String} params.type
       * @param {Number} params.offset
       * @param {Number} params.limit
       * @returns {Promise}
       */
      tournaments: (params = {}) => {
        this._defaults(params);

        // Must exists and be String
        if (Utils.isStringEmpty(params.name)) throw new TypeError('name must be of type: String');

        // Must exists and be String
        if ('game' in params && Utils.isStringEmpty(params.game)) throw new TypeError('game must be of type: String');

        // Must exists and be String
        if ('region' in params && Utils.isStringEmpty(params.region)) throw new TypeError('region must be of type: String');

        const query = _.pick(params, ['name', 'game', 'region', 'type', 'offset', 'limit']);

        const endpoint = `/${endpointPrefix}/tournaments`;
        const url = this._buildUrl(endpoint, query);

        return this._request(url);
      },
    };
  }

  /**
   * @description Calls related to teams endpoints
   */
  get teams() {
    const endpointPrefix = 'teams';

    return {
      /**
       * @description Retrieve team details
       * @function teams.show()
       * @param {Object} params
       * @param {String} params.team_id
       * @returns {Promise}
       */
      show: (params = {}) => {
        this._defaults(params);

        // Must exists and be String
        if (Utils.isStringEmpty(params.team_id)) throw new TypeError('team_id  must be of type: String');

        const endpoint = `/${endpointPrefix}/${params.team_id}`;
        const url = this._buildUrl(endpoint, {});

        return this._request(url);
      },

      /**
       * @description Retrieve statistics of a team
       * @function teams.stats()
       * @param {Object} params
       * @param {String} params.team_id
       * @param {String} params.game_id
       * @returns {Promise}
       */
      stats: (params = {}) => {
        this._defaults(params);

        // Must exists and be String
        if (Utils.isStringEmpty(params.team_id)) throw new TypeError('team_id  must be of type: String');
        // Must exists and be String
        if (Utils.isStringEmpty(params.game_id)) throw new TypeError('game_id  must be of type: String');

        const endpoint = `/${endpointPrefix}/${params.team_id}/stats/${params.game_id}`;
        const url = this._buildUrl(endpoint, {});

        return this._request(url);
      },

      /**
       * @description Retrieve tournaments of a team
       * @function teams.tournaments()
       * @param {Object} params
       * @param {String} params.team_id
       * @param {String} params.game_id
       * @returns {Promise}
       */
      tournaments: (params = {}) => {
        this._defaults(params);

        // Must exists and be String
        if (Utils.isStringEmpty(params.team_id)) throw new TypeError('team_id  must be of type: String');

        const query = _.pick(params, ['offset', 'limit']);

        const endpoint = `/${endpointPrefix}/${params.team_id}/tournaments`;
        const url = this._buildUrl(endpoint, query);

        return this._request(url);
      },
    };
  }

  /**
   * @description Calls related to tournaments endpoints
   */
  get tournaments() {
    const endpointPrefix = 'tournaments';

    return {
      /**
       * @description Retrieve tournaments v1 ( no longer used)
       * @function tournaments.get()
       * @param {Object} params
       * @param {String} params.game
       * @param {String} params.region
       * @param {Number} params.offset
       * @param {Number} params.limit
       * @returns {Promise}
       */
      get: (params = {}) => {
        this._defaults(params);

        const endpoint = `/${endpointPrefix}/`;
        const url = this._buildUrl(endpoint, params);

        return this._request(url);
      },

      /**
       * @description Retrieve tournament details
       * @function tournaments.show()
       * @param {Object} params
       * @param {String} params.tournament_id
       * @param {Array[String]} params.expanded
       * @returns {Promise}
       */
      show: (params = {}) => {
        this._defaults(params);

        // Must exists and be String
        if (Utils.isStringEmpty(params.tournament_id)) throw new TypeError('tournament_id  must be of type: String');

        const query = _.pick(params, ['expanded']);

        const endpoint = `/${endpointPrefix}/${params.tournament_id}`;
        const url = this._buildUrl(endpoint, query);

        return this._request(url);
      },

      /**
       * @description Retrieve brackets of a tournament
       * @function tournaments.brackets()
       * @param {Object} params
       * @param {String} params.tournament_id
       * @returns {Promise}
       */
      brackets: (params = {}) => {
        this._defaults(params);

        // Must exists and be String
        if (Utils.isStringEmpty(params.tournament_id)) throw new TypeError('tournament_id  must be of type: String');

        const endpoint = `/${endpointPrefix}/${params.tournament_id}/brackets`;
        const url = this._buildUrl(endpoint, {});

        return this._request(url);
      },

      /**
       * @description Retrieve all matches of a tournament
       * @function tournaments.brackets()
       * @param {Object} params
       * @param {String} params.tournament_id
       * @param {Number} params.offset
       * @param {Number} params.limit
       * @returns {Promise}
       */
      matches: (params = {}) => {
        this._defaults(params);

        // Must exists and be String
        if (Utils.isStringEmpty(params.tournament_id)) throw new TypeError('tournament_id  must be of type: String');

        const query = _.pick(params, ['offset', 'limit']);

        const endpoint = `/${endpointPrefix}/${params.tournament_id}/matches`;
        const url = this._buildUrl(endpoint, query);

        return this._request(url);
      },

      /**
       * @description Retrieve all teams of a tournament
       * @function tournaments.teams()
       * @param {Object} params
       * @param {String} params.tournament_id
       * @param {Number} params.offset
       * @param {Number} params.limit
       * @returns {Promise}
       */
      teams: (params = {}) => {
        this._defaults(params);

        // Must exists and be String
        if (Utils.isStringEmpty(params.tournament_id)) throw new TypeError('tournament_id  must be of type: String');

        const query = _.pick(params, ['offset', 'limit']);

        const endpoint = `/${endpointPrefix}/${params.tournament_id}/teams`;
        const url = this._buildUrl(endpoint, query);

        return this._request(url);
      },
    };
  }

  /**
   * @description Checks the default parameters
   * @function _defaults()
   * @param {Object} params
   * @param {Number} params.offset
   * @param {Number} params.limit
   * @returns {Object}
   */
  _defaults(params) {
    // Must be Object
    if (!Utils.isObject(params)) throw new TypeError('params must be of type: Object');

    // If exists be String
    if ('type' in params && !Utils.isString(params.type)) throw new TypeError('type must be of type: String');

    // Must exists and be Array
    if ('expanded' in params && !Utils.isArray(params.expanded))
      throw new TypeError('expanded must be of type: Array[String]');

    // If exists be String
    if ('offset' in params && !Utils.isNumber(params.type)) throw new TypeError('offset must be of type: Number');
    if ('limit' in params && !Utils.isNumber(params.limit)) throw new TypeError('limit must be of type: Number');
  }

  /**
   * @description Formats Object into http query
   * @function _buildQuery()
   * @param {String} url
   * @param {Object} query
   * @returns {String}
   */
  _buildQuery(query) {
    return Object.entries(query)
      .map((pair) => pair.map(encodeURIComponent).join('='))
      .join('&');
  }

  /**
   * @description Formats endpoint and params into a url
   * @function _buildQuery()
   * @param {String} endpoint
   * @param {Object} params
   * @returns {String}
   */
  _buildUrl(endpoint, params) {
    const query = this._buildQuery(params);
    const base = `${Constants.BaseURL}${endpoint}`;

    return query ? `${base}?${query}` : base;
  }

  /**
   * @description Sends request to api
   * @function _request()
   * @param {String} url
   * @param {Object} options
   * @returns {Promise}
   */
  _request(url, options) {
    const key = this.apiKey;
    const headers = {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
    };

    return new Promise((resolve, reject) => {
      if (!key) {
        reject(new TypeError('api key must be supplied'));
      }

      fetch(url, { ...options, headers })
        .then((res) => res.json())
        .then((json) => {
          resolve(json);
        })
        .catch((e) => reject(e));
    });
  }
}

FaceitAPI.BASEURL = Constants.BaseURL;

module.exports = FaceitAPI;
