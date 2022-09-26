import _ from 'lodash';

import Utils from './helpers/utils.js';
import Constants from './helpers/constants.js';

// TODO:: Request returns promise, update comments

/**
 * @class FaceitAPI
 * @author Demian <devaccdemiann@gmail.com>
 * @description A Node.js faceit-wrapper for the faceit data api with only two dependencies. For more accurate and up to date documentation visit https://developers.faceit.com/docs/tools/data-api
 * @example
 *     import FaceitAPI from '@cstools-app/faceit-wrapper'
 *     const client = new FaceitAPI();
 * @public
 * @license MIT
 */
class FaceitAPI {
  /**
   * @param {String} apiKey Authorization key
   * @param {function} fetch Make sure to supply a fetch, I suggest isomorphic-unfetch
   *
   * @example Cloudflare workers example fetch = (...args) => fetch(...args)
   */
  constructor(apiKey, fetch) {
    this.apiKey = apiKey;
    this.fetch = fetch;
  }

  /**
   * @description Calls related to championships endpoints
   */
  get championships() {
    const endpointPrefix = 'championships';

    return {
      /**
       * @function championships.all
       * @description Retrieve all championships of a game
       *
       * @param {Object} params
       * @param {String} params.game
       * @param {String} params.type
       * @param {Number} params.offset
       * @param {Number} params.limit
       *
       * @return {Promise}
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
       * @function championships.show
       * @description Retrieve championship details
       *
       * @param {Object} params
       * @param {String} params.championship_id
       * @param {String[]} params.expanded
       *
       * @return {Promise}
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
       * @function championships.matches
       * @description Retrieve all matches of a championship
       *
       * @param {Object} params
       * @param {String} params.championship_id
       * @param {String} params.type
       * @param {Number} params.offset
       * @param {Number} params.limit
       *
       * @return {Promise}
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
       * @function championships.subscriptions
       * @description Retrieve all subscriptions of a championship
       *
       * @param {Object} params
       * @param {String} params.championship_id
       * @param {String} params.type
       * @param {Number} params.offset
       * @param {Number} params.limit
       *
       * @return {Promise}
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
       * @function games.all
       * @description Retrieve details of all games on FACEIT
       *
       * @param {Object} params
       * @param {Number} params.offset
       * @param {Number} params.limit
       *
       * @return {Promise}
       */
      all: (params = {}) => {
        this._defaults(params);

        const endpoint = `/${endpointPrefix}`;
        const url = this._buildUrl(endpoint, {});

        return this._request(url);
      },

      /**
       * @function games.show
       * @description Retrieve game details
       *
       * @param {Object} params
       * @param {String} params.game_id
       *
       * @return {Promise}
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
       * @function games.parent
       * @description Retrieve the details of the parent game, if the game is region-specific
       *
       * @param {Object} params
       * @param {String} params.game_id
       *
       * @return {Promise}
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
       * @function hubs.show
       * @description Retrieve hub details
       *
       * @param {Object} params
       * @param {String} params.hub_id
       * @param {String[]} params.expanded
       *
       * @return {Promise}
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
       * @function hubs.matches
       * @description Retrieve all matches of a hub
       *
       * @param {Object} params
       * @param {String} params.hub_id
       * @param {String} params.type
       * @param {Number} params.offset
       * @param {Number} params.limit
       *
       * @return {Promise}
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
       * @function hubs.members
       * @description Retrieve all members of a hub
       *
       * @param {Object} params
       * @param {String} params.hub_id
       * @param {Number} params.offset
       * @param {Number} params.limit
       *
       * @return {Promise}
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
       * @function hubs.roles
       * @description Retrieve all roles members can have in a hub
       *
       * @param {Object} params
       * @param {String} params.hub_id
       * @param {Number} params.offset
       * @param {Number} params.limit
       *
       * @return {Promise}
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
       * @function hubs.rules
       * @description Retrieve rules of a hub
       *
       * @param {Object} params
       * @param {String} params.hub_id
       *
       * @return {Promise}
       */
      rules: (params = {}) => {
        this._defaults(params);

        // Must exists and be String
        if (Utils.isStringEmpty(params.hub_id)) throw new TypeError('hub_id must be of type: String');

        const endpoint = `/${endpointPrefix}/${params.hub_id}/rules`;
        const url = this._buildUrl(endpoint, {});

        return this._request(url);
      },

      /**
       * @function hubs.stats
       * @description Retrieve statistics of a hub
       *
       * @param {Object} params
       * @param {String} params.hub_id
       * @param {Number} params.offset
       * @param {Number} params.limit
       *
       * @return {Promise}
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
           * @function leaderboards.championships.show
           * @description Retrieve all leaderboards of a championship
           *
           * @param {Object} params
           * @param {String} params.championship_id
           * @param {Number} params.offset
           * @param {Number} params.limit
           *
           * @return {Promise}
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
           * @function leaderboards.championships.group
           * @description Retrieve group ranking of a championship
           *
           * @param {Object} params
           * @param {String} params.championship_id
           * @param {String} params.group_id
           * @param {Number} params.offset
           * @param {Number} params.limit
           *
           * @return {Promise}
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
           * @function leaderboards.hubs.show
           * @description Retrieve all leaderboards of a hub
           *
           * @param {Object} params
           * @param {String} params.hub_id
           * @param {Number} params.offset
           * @param {Number} params.limit
           *
           * @return {Promise}
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
           * @function leaderboards.hubs.general
           * @description Retrieve all time ranking of a hub
           *
           * @param {Object} params
           * @param {String} params.hub_id
           * @param {Number} params.offset
           * @param {Number} params.limit
           *
           * @return {Promise}
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
           * @function leaderboards.hubs.season
           * @description Retrieve seasonal ranking of a hub
           *
           * @param {Object} params
           * @param {String} params.hub_id
           * @param {String} params.season_id
           * @param {Number} params.offset
           * @param {Number} params.limit
           *
           * @return {Promise}
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
       * @function leaderboards.show
       * @description Retrieve ranking from a leaderboard id
       *
       * @param {Object} params
       * @param {String} params.leaderboard_id
       * @param {String[]} params.expanded
       * @param {Number} params.offset
       * @param {Number} params.limit
       *
       * @return {Promise}
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
       * @function matches.show
       * @description Retrieve match details
       *
       * @param {Object} params
       * @param {String} params.match_id
       *
       * @return {Promise}
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
       * @function matches.stats
       * @description Retrieve statistics of a match
       *
       * @param {Object} params
       * @param {String} params.match_id
       *
       * @return {Promise}
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
       * @function organizers.get
       * @description Retrieve organizer details from name
       *
       * @param {Object} params
       * @param {String} params.name
       *
       * @return {Promise}
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
       * @function organizers.show
       * @description Retrieve organizer details
       *
       * @param {Object} params
       * @param {String} params.organizer_id
       *
       * @return {Promise}
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
       * @function organizers.championships
       * @description Retrieve all championships of an organizer
       *
       * @param {Object} params
       * @param {String} params.organizer_id
       * @param {Number} params.offset
       * @param {Number} params.limit
       *
       * @return {Promise}
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
       * @function organizers.games
       * @description Retrieve all games an organizer is involved with
       *
       * @param {Object} params
       * @param {String} params.organizer_id
       * @param {Number} params.offset
       * @param {Number} params.limit
       *
       * @return {Promise}
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
       * @function organizers.hubs
       * @description Retrieve all hubs of an organizer
       *
       * @param {Object} params
       * @param {String} params.organizer_id
       * @param {Number} params.offset
       * @param {Number} params.limit
       *
       * @return {Promise}
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
       * @function organizers.tournaments
       * @description Retrieve all tournaments of an organizer
       *
       * @param {Object} params
       * @param {String} params.organizer_id
       * @param {String} params.type
       * @param {Number} params.offset
       * @param {Number} params.limit
       *
       * @return {Promise}
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
       * @function players.get
       * @description Retrieve player details
       *
       * @param {Object} params
       * @param {String} params.nickname
       * @param {String} params.game
       * @param {String} params.game_player_id
       *
       * @return {Promise}
       */
      get: (params = {}) => {
        this._defaults(params);

        const endpoint = `/${endpointPrefix}`;
        const url = this._buildUrl(endpoint, params);

        return this._request(url);
      },

      /**
       * @function players.show
       * @description Retrieve player details
       *
       * @param {Object} params
       * @param {String} params.player_id
       *
       * @return {Promise}
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
       * @function players.history
       * @description Retrieve all matches of a player
       *
       * @param {Object} params
       * @param {String} params.player_id
       * @param {String} params.game
       * @param {Number} params.from
       * @param {Number} params.to
       * @param {Number} params.offset
       * @param {Number} params.limit
       *
       * @return {Promise}
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
       * @function players.hubs
       * @description Retrieve all hubs of a player
       *
       * @param {Object} params
       * @param {String} params.player_id
       * @param {Number} params.offset
       * @param {Number} params.limit
       *
       * @return {Promise}
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
       * @function organizers.stats
       * @description Retrieve statistics of a player
       *
       * @param {Object} params
       * @param {String} params.player_id
       * @param {String} params.game_id
       *
       * @return {Promise}
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
       * @function players.tournaments
       * @description Retrieve all tournaments of a player
       *
       * @param {Object} params
       * @param {String} params.player_id
       * @param {Number} params.offset
       * @param {Number} params.limit
       *
       * @return {Promise}
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
       * @function rankings.game
       * @description Retrieve global ranking of a game
       *
       * @param {Object} params
       * @param {String} params.game_id
       * @param {String} params.region
       * @param {String} params.country
       * @param {Number} params.offset
       * @param {Number} params.limit
       *
       * @return {Promise}
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
       * @function rankings.player
       * @description Retrieve user position in the global ranking of a game
       *
       * @param {Object} params
       * @param {String} params.game_id
       * @param {String} params.region
       * @param {String} params.player_id
       * @param {String} params.country
       * @param {Number} params.limit
       *
       * @return {Promise}
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
       * @function search.championships
       * @description Search for championships
       *
       * @param {Object} params
       * @param {String} params.name
       * @param {String} params.game
       * @param {String} params.region
       * @param {String} params.type
       * @param {Number} params.offset
       * @param {Number} params.limit
       *
       * @return {Promise}
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
       * @function search.hubs
       * @description Search for hubs
       *
       * @param {Object} params
       * @param {String} params.name
       * @param {String} params.game
       * @param {String} params.region
       * @param {Number} params.offset
       * @param {Number} params.limit
       *
       * @return {Promise}
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
       * @function search.organizers
       * @description Search for organizers
       *
       * @param {Object} params
       * @param {String} params.name
       * @param {Number} params.offset
       * @param {Number} params.limit
       *
       * @return {Promise}
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
       * @function search.players
       * @description Search for players
       *
       * @param {Object} params
       * @param {String} params.nickname
       * @param {String} params.game
       * @param {String} params.country
       * @param {Number} params.offset
       * @param {Number} params.limit
       *
       * @return {Promise}
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
       * @function search.teams
       * @description Search for teams
       *
       * @param {Object} params
       * @param {String} params.nickname
       * @param {String} params.game
       * @param {Number} params.offset
       * @param {Number} params.limit
       *
       * @return {Promise}
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
       * @function search.tournaments
       * @description Search for tournaments
       *
       * @param {Object} params
       * @param {String} params.name
       * @param {String} params.game
       * @param {String} params.region
       * @param {String} params.type
       * @param {Number} params.offset
       * @param {Number} params.limit
       *
       * @return {Promise}
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
       * @function teams.show
       * @description Retrieve team details
       *
       * @param {Object} params
       * @param {String} params.team_id
       *
       * @return {Promise}
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
       * @function teams.stats
       * @description Retrieve statistics of a team
       *
       * @param {Object} params
       * @param {String} params.team_id
       * @param {String} params.game_id
       *
       * @return {Promise}
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
       * @function teams.tournaments
       * @description Retrieve tournaments of a team
       *
       * @param {Object} params
       * @param {String} params.team_id
       * @param {String} params.game_id
       *
       * @return {Promise}
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
       * @function tournaments.get
       * @description Retrieve tournaments v1 ( no longer used)
       * @deprecated
       *
       * @param {Object} params
       * @param {String} params.game
       * @param {String} params.region
       * @param {Number} params.offset
       * @param {Number} params.limit
       *
       * @return {Promise}
       */
      get: (params = {}) => {
        this._defaults(params);

        const endpoint = `/${endpointPrefix}/`;
        const url = this._buildUrl(endpoint, params);

        return this._request(url);
      },

      /**
       * @function tournaments.show
       * @description Retrieve tournament details
       *
       * @param {Object} params
       * @param {String} params.tournament_id
       * @param {String[]} params.expanded
       *
       * @return {Promise}
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
       * @function tournaments.brackets
       * @description Retrieve brackets of a tournament
       *
       * @param {Object} params
       * @param {String} params.tournament_id
       *
       * @return {Promise}
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
       * @function tournaments.brackets
       * @description Retrieve all matches of a tournament
       *
       * @param {Object} params
       * @param {String} params.tournament_id
       * @param {Number} params.offset
       * @param {Number} params.limit
       *
       * @return {Promise}
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
       * @function tournaments.teams
       * @description Retrieve all teams of a tournament
       *
       * @param {Object} params
       * @param {String} params.tournament_id
       * @param {Number} params.offset
       * @param {Number} params.limit
       *
       * @return {Promise}
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
   * @function _defaults
   * @description Checks the default parameters
   *
   * @param {Object} params
   * @param {Number} params.offset
   * @param {Number} params.limit
   *
   * @return {void}
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
    if ('offset' in params && !Utils.isNumber(params.offset)) throw new TypeError('offset must be of type: Number');
    if ('limit' in params && !Utils.isNumber(params.limit)) throw new TypeError('limit must be of type: Number');
  }

  /**
   * @function _buildQuery
   * @description Formats Object into http query
   *
   * @param {Object} query
   *
   * @return {String}
   */
  _buildQuery(query) {
    return Object.entries(query)
      .map((pair) => pair.map(encodeURIComponent).join('='))
      .join('&');
  }

  /**
   * @function _buildQuery
   * @description Formats endpoint and params into a url
   *
   * @param {String} endpoint
   * @param {Object} params
   *
   * @return {String}
   */
  _buildUrl(endpoint, params) {
    const query = this._buildQuery(params);
    const base = `${Constants.BaseURL}${endpoint}`;

    return query ? `${base}?${query}` : base;
  }

  /**
   * @function _request
   * @description Sends request to api
   *
   * @param {String} url
   * @param {Object} options
   *
   * @return {Promise}
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

      this.fetch(url, { ...options, headers })
        .then((res) => res.json())
        .then((json) => {
          resolve(json);
        })
        .catch((e) => reject(e));
    });
  }
}

FaceitAPI.BASEURL = Constants.BaseURL;

export default FaceitAPI;
