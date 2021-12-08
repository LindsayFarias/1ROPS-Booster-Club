
exports.up = function(knex) {
  return knex.schema.createTable('income_patch', table => {
      table.integer('patch');
      table.integer('income');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('income_patch')
};
