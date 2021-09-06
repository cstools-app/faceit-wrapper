# Faceit Data API Wrapper/Client for NodeJS

[![Test package](https://github.com/faceit-helpers/wrapper/actions/workflows/test.js.yml/badge.svg?branch=main)](https://github.com/faceit-helpers/wrapper/actions/workflows/test.js.yml)

## • Description / Information

Package uses 2 dependencies [isomorphic-unfetch](https://www.npmjs.com/package/isomorphic-unfetch) and [lodash](https://www.npmjs.com/package/lodash).

Still need to write more documentation and tests for this

Check the [documentation](https://developers.faceit.com/docs/tools/data-api)
for up to date information

## • Installation

```bash
npm i @faceit-helpers/wrapper
```

## • Quick Start Example

```javascript
// Import the wrapper library
const FaceitAPI = require('@faceit-helpers/wrapper');

// Initiate the client
const Client = new FaceitAPI();

// Create a function that searches for a player
const get = async () => {
  const res = await client.search.players({ nickname: 'DotJar', game: 'csgo', country: 'nl' });

  console.log(res);
};

// Execute the function
get();
```

## • Notes on methods

### Naming conventions

```
ROUTE:: /leaderboards/championships/{championship_id}
METHOD:: leaderboards.championships.show({championship_id: <id>})
```

```
​ROUTE:: /leaderboards​/{leaderboard_id}
METHOD:: leaderboards.show()
```

```
ROUTE:: /championships
METHOD:: championships.get()
```

```
ROUTE:: /championships/{championship_id}
METHOD:: championships.show({championship_id: <id>, <params>})
```

### Params

Params are automatically splited into wildcards & query

Include the params as listed on the Faceit [documentation](https://developers.faceit.com/docs/tools/data-api) per route

## • License

[MIT](LICENSE)
