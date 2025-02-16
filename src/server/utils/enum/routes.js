const BASE_PATH = {
	USERS: '/api/users',
	TEAMS: '/api/teams',
	PROJECTS: '/api/projects',
	TODOS: '/api/todos',
	COMMENTS: '/api/comments'
};

const USERS_PATH = {
	REGISTER: '/register',
	LOGIN: '/login',
	ME: '/me'
};

const TEAMS_PATH = {
	GET_TEAM: '/',
	GET_TEAM_MEMBERS: '/members',
	INVITE_TEAM_MEMBERS: '/members'
};

const PROJECTS_PATH = {
	CREATE_PROJECT: '/',
	GET_PROJECTS: '/',
	UPDATE_PROJECT: '/:id',
	DELETE_PROJECT: '/:id'
};

module.exports = {
	BASE_PATH,
	USERS_PATH,
	TEAMS_PATH,
	PROJECTS_PATH
};
