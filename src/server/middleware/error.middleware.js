const { HttpStatusCode, HttpStatusMessage } = require('../utils/enum/express');
const ApplicationError = require('../utils/express/error');
const ApiResponse = require('../utils/express/response');

/**
 * Default error handler middleware that formats and sends error responses to the client.
 *
 * @param {any} err - The error object.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} _next - The next middleware function (unused in this context).
 */
const errorHandler = (err, _req, res, _next) => {
	// Log the error to the console
	console.error(err);
	// Check if the error is an instance of ApplicationError
	if (err instanceof ApplicationError) {
		// Use the ApiResponse class to send a structured error response
		ApiResponse.send(res, err.status, err.message, err.data);
	} else {
		// For non-ApplicationError errors, send a generic 500 Internal Server Error response
		const genericMessage = HttpStatusMessage.INTERNAL_SERVER;
		ApiResponse.send(res, HttpStatusCode.INTERNAL_SERVER, genericMessage);
	}
};

module.exports = errorHandler;
