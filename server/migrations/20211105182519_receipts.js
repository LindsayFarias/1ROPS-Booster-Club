
exports.up = function(knex) {
  return knex.schema.createTable('receipts', table => {
      table.increments('id');
      table.timestamp('date').defaultTo(knex.fn.now());
      table.text('reason');
      table.integer('expenditures');
      table.text('associated_member');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('receipts');
};
