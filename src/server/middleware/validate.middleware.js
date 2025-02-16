const ApplicationError = require('../utils/express/error');
const { HttpStatusCode, HttpStatusMessage } = require('../utils/enum/express');

const validateEndpoint = schema => {
	return (req, _res, next) => {
		try {
			const dataToValidate = {
				...req.query,
				...req.body
			};

			const { error } = schema.validate(dataToValidate, { abortEarly: false });

			if (error) {
				throw new ApplicationError(HttpStatusCode.BAD_REQUEST, HttpStatusMessage.VALIDATION_ERROR, {
					errors: error.details.map(detail => detail.message)
				});
			}
			next();
		} catch (error) {
			next(error);
		}
	};
};

module.exports = validateEndpoint;
