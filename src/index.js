const fetch = require('isomorphic-unfetch');
const _ = require('lodash');

const Utils = require('./helpers/utils');
const Constants = require('./helpers/constants');

/**
 * @class FaceitAPI
 * @author Demian <devaccdemiann@gmail.com>
 * @description A Node.js wrapper for the faceit data api with only two dependencies. For more accurate and up to date documentation visit https://developers.faceit.com/docs/tools/data-api
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
       * @description Retrieve all championships of a game
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
        const url = this._buildUrl(endpoint, {});

        return this._request(url);
      },

      /**
       * @description Retrieve championship details
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

        const query = _.pick(params, ['expanded']);

        const endpoint = `/${endpointPrefix}/${params.championship_id}`;
        const url = this._buildUrl(endpoint, query);

        return this._request(url);
      },

      /**
       * @description Retrieve all matches of a championship
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

        const query = _.pick(params, ['type', 'offset', 'limit']);

        const endpoint = `/${endpointPrefix}/${params.championship_id}/matches`;
        const url = this._buildUrl(endpoint, query);

        return this._request(url);
      },

      /**
       * @description Retrieve all subscriptions of a championship
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
       * @param {object} params
       * @param {number} params.offset
       * @param {number} params.limit
       * @returns {Object}
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
       * @param {object} params
       * @param {string} params.game_id
       * @returns {Object}
       */
      show: (params = {}) => {
        this._defaults(params);

        // Must exists and be string
        if (Utils.isStringEmpty(params.game_id)) Utils._WARN_('Invalid parameter', 'game_id must be of type: String');

        const endpoint = `/${endpointPrefix}/${params.game_id}`;
        const url = this._buildUrl(endpoint, {});

        return this._request(url);
      },

      /**
       * @description Retrieve the details of the parent game, if the game is region-specific
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

        const query = _.pick(params, ['expanded']);

        const endpoint = `/${endpointPrefix}/${params.hub_id}`;
        const url = this._buildUrl(endpoint, query);

        return this._request(url);
      },

      /**
       * @description REtrieve all matches of a hub
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

        const query = _.pick(params, ['type', 'offset', 'limit']);

        const endpoint = `/${endpointPrefix}/${params.hub_id}/matches`;
        const url = this._buildUrl(endpoint, query);

        return this._request(url);
      },

      /**
       * @description REtrieve all members of a hub
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

        const query = _.pick(params, ['offset', 'limit']);

        const endpoint = `/${endpointPrefix}/${params.hub_id}/members`;
        const url = this._buildUrl(endpoint, query);

        return this._request(url);
      },

      /**
       * @description Retrieve all roles members can have in a hub
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

        const query = _.pick(params, ['offset', 'limit']);

        const endpoint = `/${endpointPrefix}/${params.hub_id}/roles`;
        const url = this._buildUrl(endpoint, query);

        return this._request(url);
      },

      /**
       * @description Retrieve rules of a hub
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
        const url = this._buildUrl(endpoint, {});

        return this._request(url);
      },

      /** Retrieve statistics of a hub
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

            const query = _.pick(params, ['offset', 'limit']);

            const endpoint = `/${endpointPrefix}/${championshipsPrefix}/${params.championship_id}`;
            const url = this._buildUrl(endpoint, query);

            return this._request(url);
          },

          /**
           * @description Retrieve group ranking of a championship
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

            const query = _.pick(params, ['offset', 'limit']);

            const endpoint = `/${endpointPrefix}/${championshipsPrefix}/${params.hub_id}`;
            const url = this._buildUrl(endpoint, query);

            return this._request(url);
          },

          /**
           * @description Retrieve all time ranking of a hub
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

            const query = _.pick(params, ['offset', 'limit']);

            const endpoint = `/${endpointPrefix}/${hubsPrefix}/${params.hub_id}/general`;
            const url = this._buildUrl(endpoint, query);

            return this._request(url);
          },

          /**
           * @description Retrieve seasonal ranking of a hub
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

        // Must exists and be array
        if ('expanded' in params && !Utils.isArray(params.expanded))
          Utils._WARN_('Invalid parameter', 'expanded must be of type: Array[String]');

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
       * @param {object} params
       * @param {string} params.match_id
       * @returns {Object}
       */
      show: (params = {}) => {
        this._defaults(params);

        // Must exists and be string
        if (Utils.isStringEmpty(params.match_id)) Utils._WARN_('Invalid parameter', 'match_id must be of type: String');

        const endpoint = `/${endpointPrefix}/${params.match_id}`;
        const url = this._buildUrl(endpoint, {});

        return this._request(url);
      },

      /**
       * @description Retrieve statistics of a match
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
       * @param {object} params
       * @param {string} params.name
       * @returns {Object}
       */
      get: (params = {}) => {
        this._defaults(params);

        // Must exists and be string
        if (Utils.isStringEmpty(params.name)) Utils._WARN_('Invalid parameter', 'name must be of type: String');

        const endpoint = `/${endpointPrefix}`;
        const url = this._buildUrl(endpoint, {});

        return this._request(url);
      },

      /**
       * @description Retrieve organizer details
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
        const url = this._buildUrl(endpoint, {});

        return this._request(url);
      },

      /**
       * @description Retrieve all championships of an organizer
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

        const query = _.pick(params, ['offset', 'limit']);

        const endpoint = `/${endpointPrefix}/${params.organizer_id}/championships`;
        const url = this._buildUrl(endpoint, query);

        return this._request(url);
      },

      /**
       * @description Retrieve all games an organizer is involved with
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
        const url = this._buildUrl(endpoint, {});

        return this._request(url);
      },

      /**
       * @description Retrieve all hubs of an organizer
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

        const query = _.pick(params, ['offset', 'limit']);

        const endpoint = `/${endpointPrefix}/${params.organizer_id}/hubs`;
        const url = this._buildUrl(endpoint, query);

        return this._request(url);
      },

      /**
       * @description Retrieve all tournaments of an organizer
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
       * @description Retrieve player details
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
        const url = this._buildUrl(endpoint, {});

        return this._request(url);
      },

      /**
       * @description Retrieve all matches of a player
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

        const query = _.pick(params, ['from', 'to', 'offset', 'limit']);

        const endpoint = `/${endpointPrefix}/${params.player_id}/history`;
        const url = this._buildUrl(endpoint, query);

        return this._request(url);
      },

      /**
       * @description Retrieve all hubs of a player
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

        const query = _.pick(params, ['offset', 'limit']);

        const endpoint = `/${endpointPrefix}/${params.player_id}/hubs`;
        const url = this._buildUrl(endpoint, query);

        return this._request(url);
      },

      /**
       * @description Retrieve statistics of a player
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
        const url = this._buildUrl(endpoint, {});

        return this._request(url);
      },

      /**
       * @description Retrieve all tournaments of a player
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

        const query = _.pick(params, ['country', 'offset', 'limit']);

        const endpoint = `/${endpointPrefix}/games/${params.game_id}/regions/${params.region}`;
        const url = this._buildUrl(endpoint, query);

        return this._request(url);
      },

      /**
       * @description Retrieve user position in the global ranking of a game
       * @function rankings.player()
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
       * @param {object} params
       * @param {string} params.name
       * @param {string} params.game
       * @param {string} params.region
       * @param {string} params.type
       * @param {number} params.offset
       * @param {number} params.limit
       * @returns {Object}
       */
      championships: (params = {}) => {
        this._defaults(params);

        // Must exists and be string
        if (Utils.isStringEmpty(params.name)) Utils._WARN_('Invalid parameter', 'name must be of type: String');

        // Must exists and be string
        if ('game' in params && Utils.isStringEmpty(params.game))
          Utils._WARN_('Invalid parameter', 'game must be of type: String');

        // Must exists and be string
        if ('region' in params && Utils.isStringEmpty(params.region))
          Utils._WARN_('Invalid parameter', 'region must be of type: String');

        const query = _.pick(params, ['name', 'game', 'region', 'offset', 'limit']);

        const endpoint = `/${endpointPrefix}/championships`;
        const url = this._buildUrl(endpoint, query);

        return this._request(url);
      },

      /**
       * @description Search for hubs
       * @function search.hubs()
       * @param {object} params
       * @param {string} params.name
       * @param {string} params.game
       * @param {string} params.region
       * @param {number} params.offset
       * @param {number} params.limit
       * @returns {Object}
       */
      hubs: (params = {}) => {
        this._defaults(params);

        // Must exists and be string
        if (Utils.isStringEmpty(params.name)) Utils._WARN_('Invalid parameter', 'name must be of type: String');

        // Must exists and be string
        if ('game' in params && Utils.isStringEmpty(params.game))
          Utils._WARN_('Invalid parameter', 'game must be of type: String');

        // Must exists and be string
        if ('region' in params && Utils.isStringEmpty(params.region))
          Utils._WARN_('Invalid parameter', 'region must be of type: String');

        const query = _.pick(params, ['name', 'game', 'region', 'offset', 'limit']);

        const endpoint = `/${endpointPrefix}/hubs`;
        const url = this._buildUrl(endpoint, query);

        return this._request(url);
      },

      /**
       * @description Search for organizers
       * @function search.organizers()
       * @param {object} params
       * @param {string} params.name
       * @param {number} params.offset
       * @param {number} params.limit
       * @returns {Object}
       */
      organizers: (params = {}) => {
        this._defaults(params);

        // Must exists and be string
        if (Utils.isStringEmpty(params.name)) Utils._WARN_('Invalid parameter', 'name must be of type: String');

        const query = _.pick(params, ['name', 'offset', 'limit']);

        const endpoint = `/${endpointPrefix}/organizers`;
        const url = this._buildUrl(endpoint, query);

        return this._request(url);
      },

      /**
       * @description Search for players
       * @function search.players()
       * @param {object} params
       * @param {string} params.nickname
       * @param {string} params.game
       * @param {string} params.country
       * @param {number} params.offset
       * @param {number} params.limit
       * @returns {Object}
       */
      players: (params = {}) => {
        this._defaults(params);

        // Must exists and be string
        if (Utils.isStringEmpty(params.nickname)) Utils._WARN_('Invalid parameter', 'nickname must be of type: String');

        // Must exists and be string
        if ('game' in params && Utils.isStringEmpty(params.game))
          Utils._WARN_('Invalid parameter', 'game must be of type: String');

        // Must exists and be string
        if ('country' in params && Utils.isStringEmpty(params.country))
          Utils._WARN_('Invalid parameter', 'country must be of type: String');

        const query = _.pick(params, ['nickname', 'country', 'offset', 'limit']);

        const endpoint = `/${endpointPrefix}/players`;
        const url = this._buildUrl(endpoint, query);

        return this._request(url);
      },

      /**
       * @description Search for teams
       * @function search.teams()
       * @param {object} params
       * @param {string} params.nickname
       * @param {string} params.game
       * @param {number} params.offset
       * @param {number} params.limit
       * @returns {Object}
       */
      teams: (params = {}) => {
        this._defaults(params);

        // Must exists and be string
        if (Utils.isStringEmpty(params.nickname)) Utils._WARN_('Invalid parameter', 'nickname must be of type: String');

        // Must exists and be string
        if ('game' in params && Utils.isStringEmpty(params.game))
          Utils._WARN_('Invalid parameter', 'game must be of type: String');

        const query = _.pick(params, ['nickname', 'country', 'offset', 'limit']);

        const endpoint = `/${endpointPrefix}/teams`;
        const url = this._buildUrl(endpoint, query);

        return this._request(url);
      },

      /**
       * @description Search for tournaments
       * @function search.tournaments()
       * @param {object} params
       * @param {string} params.name
       * @param {string} params.game
       * @param {string} params.region
       * @param {string} params.type
       * @param {number} params.offset
       * @param {number} params.limit
       * @returns {Object}
       */
      tournaments: (params = {}) => {
        this._defaults(params);

        // Must exists and be string
        if (Utils.isStringEmpty(params.name)) Utils._WARN_('Invalid parameter', 'name must be of type: String');

        // Must exists and be string
        if ('game' in params && Utils.isStringEmpty(params.game))
          Utils._WARN_('Invalid parameter', 'game must be of type: String');

        // Must exists and be string
        if ('region' in params && Utils.isStringEmpty(params.region))
          Utils._WARN_('Invalid parameter', 'region must be of type: String');

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
       * @param {object} params
       * @param {string} params.team_id
       * @returns {Object}
       */
      show: (params = {}) => {
        this._defaults(params);

        // Must exists and be string
        if (Utils.isStringEmpty(params.team_id)) Utils._WARN_('Invalid parameter', 'team_id  must be of type: String');

        const endpoint = `/${endpointPrefix}/${params.team_id}`;
        const url = this._buildUrl(endpoint, {});

        return this._request(url);
      },

      /**
       * @description Retrieve statistics of a team
       * @function teams.stats()
       * @param {object} params
       * @param {string} params.team_id
       * @param {string} params.game_id
       * @returns {Object}
       */
      stats: (params = {}) => {
        this._defaults(params);

        // Must exists and be string
        if (Utils.isStringEmpty(params.team_id)) Utils._WARN_('Invalid parameter', 'team_id  must be of type: String');
        // Must exists and be string
        if (Utils.isStringEmpty(params.game_id)) Utils._WARN_('Invalid parameter', 'game_id  must be of type: String');

        const endpoint = `/${endpointPrefix}/${params.team_id}/stats/${params.game_id}`;
        const url = this._buildUrl(endpoint, {});

        return this._request(url);
      },

      /**
       * @description Retrieve tournaments of a team
       * @function teams.tournaments()
       * @param {object} params
       * @param {string} params.team_id
       * @param {string} params.game_id
       * @returns {Object}
       */
      tournaments: (params = {}) => {
        this._defaults(params);

        // Must exists and be string
        if (Utils.isStringEmpty(params.team_id)) Utils._WARN_('Invalid parameter', 'team_id  must be of type: String');

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
       * @param {object} params
       * @param {string} params.game
       * @param {string} params.region
       * @param {number} params.offset
       * @param {number} params.limit
       * @returns {Object}
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
       * @param {object} params
       * @param {string} params.tournament_id
       * @param {array[string]} params.expanded
       * @returns {Object}
       */
      show: (params = {}) => {
        this._defaults(params);

        // Must exists and be string
        if (Utils.isStringEmpty(params.tournament_id))
          Utils._WARN_('Invalid parameter', 'tournament_id  must be of type: String');

        // Must exists and be array
        if ('expanded' in params && !Utils.isArray(params.expanded))
          Utils._WARN_('Invalid parameter', 'expanded must be of type: Array[String]');

        const query = _.pick(params, ['expanded']);

        const endpoint = `/${endpointPrefix}/${params.tournament_id}`;
        const url = this._buildUrl(endpoint, query);

        return this._request(url);
      },

      /**
       * @description Retrieve brackets of a tournament
       * @function tournaments.brackets()
       * @param {object} params
       * @param {string} params.tournament_id
       * @returns {Object}
       */
      brackets: (params = {}) => {
        this._defaults(params);

        // Must exists and be string
        if (Utils.isStringEmpty(params.tournament_id))
          Utils._WARN_('Invalid parameter', 'tournament_id  must be of type: String');

        const endpoint = `/${endpointPrefix}/${params.tournament_id}/brackets`;
        const url = this._buildUrl(endpoint, {});

        return this._request(url);
      },

      /**
       * @description Retrieve all matches of a tournament
       * @function tournaments.brackets()
       * @param {object} params
       * @param {string} params.tournament_id
       * @param {number} params.offset
       * @param {number} params.limit
       * @returns {Object}
       */
      matches: (params = {}) => {
        this._defaults(params);

        // Must exists and be string
        if (Utils.isStringEmpty(params.tournament_id))
          Utils._WARN_('Invalid parameter', 'tournament_id  must be of type: String');

        const query = _.pick(params, ['offset', 'limit']);

        const endpoint = `/${endpointPrefix}/${params.tournament_id}/matches`;
        const url = this._buildUrl(endpoint, query);

        return this._request(url);
      },

      /**
       * @description Retrieve all teams of a tournament
       * @function tournaments.teams()
       * @param {object} params
       * @param {string} params.tournament_id
       * @param {number} params.offset
       * @param {number} params.limit
       * @returns {Object}
       */
      teams: (params = {}) => {
        this._defaults(params);

        // Must exists and be string
        if (Utils.isStringEmpty(params.tournament_id))
          Utils._WARN_('Invalid parameter', 'tournament_id  must be of type: String');

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
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
    };

    return new Promise((resolve, reject) => {
      if (!key) {
        reject(new Error('api key must be supplied'));
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
