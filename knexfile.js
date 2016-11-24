// Update with your config settings.
const dbSettings = require("./config/db");

module.exports = {

  development: {
    client: 'pg',
    connection: dbSettings,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};
