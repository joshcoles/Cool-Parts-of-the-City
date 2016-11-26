
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('coordinates', function(table) {
      table.dropColumns('created_at', 'updated_at');
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
