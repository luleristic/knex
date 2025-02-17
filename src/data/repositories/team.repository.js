const db = require('../config/connection');

const TeamRepository = {
	getTeamById: async (teamId, userId) => {
		console.log('teamId', teamId);
		console.log('userId', userId);
		const team = await db('users_teams')
			.join('teams', 'users_teams.team_id', 'teams.id')
			.where('users_teams.user_id', userId)
			.andWhere('teams.id', teamId)
			.select('teams.id', 'teams.name')
			.first();

		return team;
	},

	getUserTeams: async userId => {
		return await db('users_teams')
			.join('teams', 'users_teams.team_id', 'teams.id')
			.where('users_teams.user_id', userId)
			.select('teams.id', 'teams.name');
	},

	getTeamMembers: async (teamId, offset, limit) => {
		const query = db('users_teams')
			.join('users', 'users_teams.user_id', 'users.id')
			.where('users_teams.team_id', teamId)
			.select('users.id', 'users.name', 'users.email');

		if (offset) {
			query.offset(offset);
		}

		if (limit) {
			query.limit(limit);
		}

		return await query;
	}
};

module.exports = TeamRepository;
