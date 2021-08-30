# wrapper

Still need to write documentation and tests for this
can use but do expect bugs ;P

Check https://developers.faceit.com/docs/tools/data-api
for accurate documentation

names are as they are listed in faceit doc
game_id -> game_id

naming conventions
/leaderboards/championships/{championship_id} -> leaderboards.championships.show

​/leaderboards​/{leaderboard_id} -> leaderboards.show

params in object it seperates query and wildcard automatically so its all in 1 object
{game_id: '', offset: ''}
