const moment = require('moment');
moment().format();
let now = moment().unix();

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return Promise.all([
        knex('users').insert({ first_name: 'Brian', last_name: 'Brickfire', email: 'test@test.com', password: hash, created_at: now, updated_at: now }),
        knex('users').insert({ first_name: 'Laura', last_name: 'Jane', email: 'test2@test.com', password: hash, created_at: now, updated_at: now })
      ])
    });
};
