exports.up = function(knex, Promise) {
  return Promise.all([
    // Users Table
    knex.schema.createTable('currencies', (t) => {
      t.increments('id').primary();
      t.string('currencyName').unique();
      t.string('currencyCode').unique();
      t.bigInteger('createdAt');
      t.bigInteger('updatedAt');
    }),
    knex.schema.createTable('countries', (t) => {
      t.increments('id').primary();
      t.string('countryShortName').unique();
      t.string('countryLongName').unique();
      t.string('countryNumericCode').unique();
      t.string('countryIso2').unique();
      t.string('countryIso3').unique();
      t.integer('currencyId')
      t.foreign('currencyId').references('currencies.id');
      t.bigInteger('createdAt');
      t.bigInteger('updatedAt');
    }),
    knex.schema.createTable('users', (t) => {
      t.increments('id').primary();
      t.string('firstName');
      t.string('lastName');
      t.string('email').unique();
      t.string('password');
      t.bigInteger('createdAt');
      t.bigInteger('updatedAt');
    }),
    knex.schema.createTable('companies', (t) => {
      t.increments('id').primary();
      t.string('companyName');
      t.string('companyDba');
      t.string('address1');
      t.string('address2');
      t.string('city');
      t.string('state');
      t.string('email');
      t.string('password');
      t.bigInteger('createdAt');
      t.bigInteger('updatedAt');
    }),
    knex.schema.createTable('company_user', (t) => {
      t.increments('id').primary();
      t.integer('companyId');
      t.foreign('companyId').references('companies.id');
      t.integer('userId');
      t.foreign('userId').references('users.id');
      t.inetger('companyDba');
      t.bigInteger('created_at');
      t.bigInteger('updated_at');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users')
  ])
};
