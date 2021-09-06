# Faceit Data API Wrapper/Client for NodeJS

[![Test package](https://github.com/faceit-helpers/wrapper/actions/workflows/test.js.yml/badge.svg?branch=main)](https://github.com/faceit-helpers/wrapper/actions/workflows/test.js.yml)

## • Description / Information

Package uses 2 dependencies [isomorphic-unfetch](https://www.npmjs.com/package/isomorphic-unfetch) and [lodash](https://www.npmjs.com/package/lodash).

Still need to write documentation and tests for this

can be used but there might be bugs ;P

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

names are as they are listed in the faceit documentation
e.g. game_id -> game_id

naming conventions

```
/leaderboards/championships/{championship_id} -> leaderboards.championships.show({championship_id: <id>})
​/leaderboards​/{leaderboard_id} -> leaderboards.show

```

```
/championships championships.get
/championships/{championship_id} championships.show({championship_id: <id>})
```

Errors are thrown as typeError

e.g.

```javascript
try {
  // History requires a player_id
  await client.players.history();
} catch (e) {
  console.log(e instanceof TypeError);
}
```

## • License

[MIT](LICENSE)
