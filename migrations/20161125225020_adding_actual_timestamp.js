
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('coordinates', function(table) {
      table.timestamp('created_at').defaultTo(knex.fn.now());
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('coordinates', function(table) {
      table.dropColumn('created_at');
    })
  ])
};