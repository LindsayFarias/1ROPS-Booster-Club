
exports.up = function(knex) {
  return knex.schema.createTable('income_event', table => {
      table.integer('income');
      table.integer('event');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('income_event');
};
