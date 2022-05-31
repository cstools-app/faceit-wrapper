# Faceit Data API faceit-wrapper/Client for NodeJS

<span class="badge-npmversion"><a href="https://www.npmjs.com/package/@cstools-app/faceit-wrapper" title="View this project on NPM"><img src="https://img.shields.io/npm/v/@cstools-app/faceit-wrapper.svg" alt="NPM version"/></a></span>
<span class="badge-npmdownloads"><a href="https://npmjs.org/package/@cstools-app/faceit-wrapper" title="View this project on NPM"><img src="https://img.shields.io/npm/dm/@cstools-app/faceit-wrapper.svg" alt="NPM downloads" /></a></span>
[![CodeQL](https://github.com/cstools-app/faceit-wrapper/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/cstools-app/faceit-wrapper/actions/workflows/codeql-analysis.yml)
[![Test package](https://github.com/cstools-app/faceit-wrapper/actions/workflows/test.js.yml/badge.svg?branch=main)](https://github.com/cstools-app/faceit-wrapper/actions/workflows/test.js.yml)

## • Description / Information

Still need to write more documentation and tests for this

Check the [documentation](https://developers.faceit.com/docs/tools/data-api)
for up to date information

## • Installation

```bash
npm i @cstools-app/faceit-wrapper
```

You'll also need a fetch method I suggest [isomorphic-unfetch](https://www.npmjs.com/package/isomorphic-unfetch) or [cross-fetch](https://www.npmjs.com/package/cross-fetch)

Why do you need to supply a fetch method?
This way people can use their own prefered way, it also means this can work in a serverless environment like cloudflare workers.

```bash
npm i isomorphic-unfetch
```

## • Quick Start Example

```javascript
import fetch from 'isomorphic-unfetch';
// Import the faceit-wrapper library
import FaceitAPI from '@cstools-app/faceit-wrapper';

// Initiate the client
const client = new FaceitAPI(api_key, fetch);

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

Params are automatically split into wildcards & query

Include the params and queries as listed on the Faceit [documentation](https://developers.faceit.com/docs/tools/data-api) per route

## • License

[MIT](LICENSE)
