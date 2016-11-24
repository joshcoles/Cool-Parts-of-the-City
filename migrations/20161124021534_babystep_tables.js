
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', function(table) {
      table.increments();
      table.string('username');
      table.string('email');
      table.string('password');
    }),

    knex.schema.createTable('maps', function(table) {
      table.increments();
      table.string('region');
      table.string('keyword');
      table.date('date_created');
      table.integer('user_id').references('users.id');
    }),

    knex.schema.createTable('coordinates', function(table) {
      table.increments();
      table.decimal('latitude');
      table.decimal('longitude');
      table.timestamps();
      table.integer('map_id').references('maps.id');
    }),

    knex.schema.createTable('favourites', function(table) {
      table.increments();
      table.integer('user_id').references('users.id');
      table.integer('map_id').references('maps.id');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('milestones'),
    knex.schema.dropTable('maps'),
    knex.schema.dropTable('coordinates'),
    knex.schema.dropTable('favourites')
  ])
};

