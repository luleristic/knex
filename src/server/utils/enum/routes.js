const BASE_PATH = {
	USERS: '/api/users',
	TEAMS: '/api/teams',
	PROJECTS: '/api/projects',
	TODOS: '/api/todos',
	COMMENTS: '/api/comments',
	NOTIFICATIONS: '/api/notifications'
};

const USERS_PATH = {
	REGISTER: '/register',
	LOGIN: '/login',
	ME: '/me'
};

const TEAMS_PATH = {
	CREATE_TEAM: '/',
	GET_TEAMS: '/',
	UPDATE_TEAM: '/:teamId',
	GET_TEAM_MEMBERS: '/members/:teamId',
	INVITE_TEAM_MEMBERS: '/members/:teamId'
};

const PROJECTS_PATH = {
	CREATE_PROJECT: '/',
	GET_PROJECTS: '/',
	UPDATE_PROJECT: '/:id',
	DELETE_PROJECT: '/:id'
};

const TODOS_PATH = {
	CREATE_TODO: '/',
	GET_TODOS: '/',
	UPDATE_TODO: '/:id',
	DELETE_TODO: '/:id'
};

const COMMENTS_PATH = {
	CREATE_COMMENT: '/',
	GET_COMMENTS: '/'
};

const NOTIFICATIONS_PATH = {
	GET_NOTIFICATIONS: '/'
};

module.exports = {
	BASE_PATH,
	USERS_PATH,
	TEAMS_PATH,
	PROJECTS_PATH,
	TODOS_PATH,
	COMMENTS_PATH,
	NOTIFICATIONS_PATH
};
