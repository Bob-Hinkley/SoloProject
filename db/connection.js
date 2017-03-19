var pg = require('pg');

var pool = new pg.Pool({
  database: 'SoloProject'
});

module.exports = pool;
