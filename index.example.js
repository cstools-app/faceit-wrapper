// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config();

const FaceitAPI = require('.');

const { KEY } = process.env;

const client = new FaceitAPI(KEY);

const get = async () => {
  const res = await client.search.players({ nickname: 'DotJar', game: 'csgo', country: 'nl' });

  // eslint-disable-next-line no-console
  console.log(res);
};
get();
