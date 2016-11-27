
exports.up = function(knex, Promise) {
  return Promise.all([
    knex('maps').insert({})
  ])
};

exports.down = function(knex, Promise) {

};
