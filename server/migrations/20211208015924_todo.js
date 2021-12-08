
exports.up = function(knex) {
  return knex.schema.createTable('todo', table => {
    table.increments('id');
    table.text('name');
    table.boolean('done');
    table.text('member');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('todo');
};
