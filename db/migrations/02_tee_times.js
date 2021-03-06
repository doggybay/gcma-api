
exports.up = function(knex) {
  return knex.schema.createTable('tee_times', table => {
    table.increments();
    table.datetime('time').unique().notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('tee_times')
};
