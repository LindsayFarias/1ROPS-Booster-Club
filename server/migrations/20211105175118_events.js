
exports.up = function(knex) {
  return knex.schema.createTable('events', table => {
      table.increments('id');
      table.text('title');
      table.datetime('date', options={useTz: true});
      table.text('about');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('events')
};
