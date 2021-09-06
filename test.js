require('dotenv').config();
const test = require('ava');

const playerID = 'cf5c2089-b4a6-4201-a69b-9fd608429c79';

const FaceitAPI = require('.');

const { KEY } = process.env;

// TODO:: Write tests for every getter

// For now test randomly selected that cover most use cases
test('Search players return array', async (t) => {
  const client = new FaceitAPI(KEY);
  const res = await client.search.players({ nickname: 'DotJar', game: 'csgo', country: 'nl' });

  t.assert(res.items[0] !== undefined);

  t.assert('player_id' in res.items[0]);
  t.assert('nickname' in res.items[0]);
  t.assert('status' in res.items[0]);
  t.assert('country' in res.items[0]);
});

test('Get History of a player', async (t) => {
  const limit = 5;

  const client = new FaceitAPI(KEY);
  const res = await client.players.history({ player_id: playerID, game: 'csgo', limit });

  t.assert(res.items[0] !== undefined);

  t.assert('match_id' in res.items[0]);

  t.assert('game_id' in res.items[0]);
  t.assert(res.items[0].game_id === 'csgo');

  t.assert('region' in res.items[0]);
  t.assert('status' in res.items[0]);

  t.assert(res.items.length <= limit);
});

test('Supply incorrect types on params', async (t) => {
  const client = new FaceitAPI(KEY);
  try {
    client.players.history({ player_id: playerID, game: 'csgo', limit: 'se5drftuyhionjkm' });
  } catch (e) {
    t.assert(e instanceof TypeError);
    t.assert(e.message === 'limit must be of type: Number');
  }
});

test('Dont include required params throws errors', async (t) => {
  const client = new FaceitAPI(KEY);
  try {
    await client.players.history();
  } catch (e) {
    t.assert(e instanceof TypeError);
    t.assert(e.message === 'player_id  must be of type: String');
  }
});
