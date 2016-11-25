
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('coordinates', function(table) {
      table.string('name');
      table.string('description');
      table.string('img_url');
      table.dropColumns('latitude', 'longitude');
      table.decimal('lat', [9], [9]);
      table.decimal('lng', [9], [9]);
    }),
    knex.schema.table('maps', function(table) {
      table.dropColumns('center_x', 'center_y', 'date_created');
      table.decimal('centre_x', [9], [9]);
      table.decimal('centre_y', [9], [9]);
      table.timestamp('created_at').defaultTo(knex.fn.now());
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('coordinates', function(table) {
      table.dropColumns('name', 'description', 'img_url', 'lat', 'lng');
    }),
    knex.schema.table('maps', function(table) {
      table.dropColumns('centre_x', 'centre_y', 'created_at');
    })
  ]);
};
