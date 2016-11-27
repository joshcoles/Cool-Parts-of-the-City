
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('maps', function(table) {
      table.dropColumn('keyword');
      table.string('title');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('maps', function(table) {
      table.dropColumn('title')
    })
  ]);
};
