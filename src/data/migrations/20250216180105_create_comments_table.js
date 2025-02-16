/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable('comments', table => {
		table.increments('id').primary();
		table.string('text').notNullable();
		table.integer('user_id').unsigned().references('id').inTable('users').onDelete('SET NULL');
		table.integer('todo_id').unsigned().references('id').inTable('todos').onDelete('CASCADE');
		table.integer('project_id').unsigned().references('id').inTable('projects').onDelete('CASCADE');
		table.timestamp('created_at').defaultTo(knex.fn.now());
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropTable('comments');
};
