const { TODO_STATUS } = require('../../server/utils/enum/todo');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable('todos', table => {
		table.increments('id').primary();
		table.string('title').notNullable();
		table.enum('status', Object.values(TODO_STATUS)).defaultTo(TODO_STATUS.BACKLOG);
		table.integer('project_id').unsigned().references('id').inTable('projects').onDelete('CASCADE');
		table.integer('team_id').unsigned().references('id').inTable('teams').onDelete('CASCADE');
		table.integer('assigned_to').unsigned().references('id').inTable('users').onDelete('SET NULL');
		table.integer('created_by').unsigned().references('id').inTable('users').onDelete('SET NULL');
		table.timestamp('created_at').defaultTo(knex.fn.now());
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropTable('todos');
};
