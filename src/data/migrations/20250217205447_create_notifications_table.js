/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable('notifications', table => {
		table.increments('id').primary();
		table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
		table.string('message').notNullable();
		table.boolean('is_read').defaultTo(false);
		table.timestamp('created_at').defaultTo(knex.fn.now());
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropTable('notifications');
};
