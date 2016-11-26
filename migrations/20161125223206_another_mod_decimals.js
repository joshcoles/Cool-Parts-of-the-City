
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('coordinates', function(table) {
      table.dropColumns('lat', 'lng');
    }),
    knex.schema.table('maps', function(table) {
      table.dropColumns('centre_x', 'center_y');
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
