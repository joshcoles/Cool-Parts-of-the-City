// Update with your config settings.
const dbConfig = require("./config/db");

module.exports = {

  development: {
    client: 'pg',
    connection: dbConfig,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};
