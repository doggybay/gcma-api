
exports.up = function(knex) {
  return knex.schema.createTable('customers_tee_times', table => {
    table.increments();
    table.integer('customer_id').references('customers.id').onDelete('CASCADE');
    table.integer('tee_time_id').references('tee_time.id').onDelete('CASCADE');

  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('customers_tee_times')
};
