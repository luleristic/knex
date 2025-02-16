const { HttpStatusCode, HttpStatusMessage } = require('../enum/express');
/**
 * Represents a standardized API response.
 * This class provides a method to send responses with a consistent structure,
 * accommodating both success and error cases with optional data.
 */
class ApiResponse {
	/**
	 * Sends a response with the given status code, message, and optionally data.
	 * @param res - The Express response object.
	 * @param status - The HTTP status code for the response.
	 * @param message - A message describing the outcome (can be either success or error).
	 * @param data - Optional data to be included in the response. This can be used for providing additional context or details, regardless of success or error status.
	 */
	static send(res, status = HttpStatusCode.OK, message = HttpStatusMessage.OK, data) {
		const responseBody = {
			status,
			message,
			data: {}
		};
		// Include data in the response if provided, for both success and error cases
		if (data !== undefined) {
			responseBody.data = data;
		}

		res.status(status).json(responseBody);
	}
}

module.exports = ApiResponse;
