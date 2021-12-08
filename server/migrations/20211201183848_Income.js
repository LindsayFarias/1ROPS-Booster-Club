
exports.up = function(knex) {
  return knex.schema.createTable('income', table => {
      table.increments('id');
      table.integer('amount');
      table.datetime('date', options={useTz: true}).defaultTo(knex.fn.now());
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('income');
};
