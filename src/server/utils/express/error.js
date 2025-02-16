/**
 * Represents an application-specific error with a status code and optional additional data.
 * This class extends the built-in Error class to include HTTP status codes and custom data for more detailed error handling.
 */
class ApplicationError extends Error {
	/**
	 * Creates an instance of ApplicationError.
	 * @param {number} status - The HTTP status code associated with the error.
	 * @param {string} message - The error message.
	 * @param {any} [data] - Optional additional data related to the error.
	 */
	constructor(status, message, data) {
		super(message);
		this.status = status;
		this.data = data;
		this.name = this.constructor.name;

		// Ensures that the instance of ApplicationError is correctly shown in the stack trace
		Object.setPrototypeOf(this, ApplicationError.prototype);
	}
}

module.exports = ApplicationError;
