
exports.up = function(knex, Promise) {
  return Promise.all([
    // Users Table
    knex.schema.createTable('users', (t) => {
      t.increments('id').primary();
      t.string('first_name');
      t.string('last_name');
      t.string('email');
      t.string('password');
      t.timestamps();
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users')
  ])
};
