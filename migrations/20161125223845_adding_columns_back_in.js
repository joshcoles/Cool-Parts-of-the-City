
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('coordinates', function(table) {
      table.decimal('lat', [15], [9]);
      table.decimal('lng', [15], [9]);
    }),
    knex.schema.table('maps', function(table) {
      table.decimal('centre_x', [15], [9]);
      table.decimal('centre_y', [15], [9]);
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('coordinates', function(table) {
      table.dropColumns('lat', 'lng');
    }),
    knex.schema.table('maps', function(table) {
      table.dropColumns('centre_x', 'centre_y');
    })
  ]);
};
