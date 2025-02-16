const { HttpStatusCode, HttpStatusMessage } = require('../utils/enum/express');
const { PaginationDefaults, PaginationMaxLimit } = require('../utils/enum/pagination');
const ApplicationError = require('../utils/express/error');

const paginate = async (req, _res, next) => {
	try {
		const page = parseInt(req.query.page) || PaginationDefaults.DefaultPage;
		const limit = parseInt(req.query.limit) || PaginationDefaults.DefaultLimit;

		if (limit > PaginationMaxLimit) throw new ApplicationError(HttpStatusCode.BAD_REQUEST, HttpStatusMessage.BAD_REQUEST);

		const offset = (page - 1) * limit;

		req.pagination = { offset, limit, page };

		next();
	} catch (error) {
		next(error);
	}
};

module.exports = paginate;
