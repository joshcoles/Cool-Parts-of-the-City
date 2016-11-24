
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('maps', function(table) {
      table.decimal('center_x');
      table.decimal('center_y');
      table.integer('zoom');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('maps');
  ])
};
