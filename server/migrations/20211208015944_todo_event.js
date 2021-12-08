
exports.up = function(knex) {
    return knex.schema.createTable('todo_event', table => {
      table.integer('todo');
      table.integer('event');
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('todo_event');
  };
