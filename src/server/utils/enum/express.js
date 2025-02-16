const HttpStatusCode = {
	OK: 200,
	CREATED: 201,
	ACCEPTED: 202,
	NO_CONTENT: 204,
	BAD_REQUEST: 400,
	UNAUTHORIZED: 401,
	FORBIDDEN: 403,
	NOT_FOUND: 404,
	CONFLICT: 409,
	UNPROCESSABLE_ENTITY: 422,
	INTERNAL_SERVER: 500
};

const HttpStatusMessage = {
	OK: 'Success',
	CREATED: 'Created',
	ACCEPTED: 'Accepted',
	NO_CONTENT: 'No Content',
	BAD_REQUEST: 'Bad Request',
	UNAUTHORIZED: 'Unauthorized',
	FORBIDDEN: 'Forbidden',
	NOT_FOUND: 'Not Found',
	CONFLICT: 'Conflict',
	UNPROCESSABLE_ENTITY: 'Unprocessable Entity',
	INTERNAL_SERVER: 'Internal Server Error',
	MISSING_FIELDS: 'Missing Fields',
	USER_NOT_FOUND: 'User not found.',
	INVALID_TOKEN: 'Invalid token.',
	USER_EXISTS: 'User already exists.',
	PROJECT_NOT_FOUND: 'Project not found.',
	TODO_NOT_FOUND: 'Todo not found.'
};

module.exports = {
	HttpStatusCode,
	HttpStatusMessage
};
