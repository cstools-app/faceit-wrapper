# wrapper

Still need to write documentation and tests for this

can be used but there might be bugs ;P

Check https://developers.faceit.com/docs/tools/data-api
for up to date documentation

names are as they are listed in the faceit documentation
e.g. game_id -> game_id

naming conventions
/leaderboards/championships/{championship_id} -> leaderboards.championships.show({championship_id: <id>})

​/leaderboards​/{leaderboard_id} -> leaderboards.show

/championships championships.get
/championships/{championship_id} championships.show({championship_id: <id>})

params in object it seperates query and wildcard automatically so include all in the same object
{game_id: '', offset: ''}

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
