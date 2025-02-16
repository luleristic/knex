const WHITELISTED_ORIGINS = [];

const corsOptions = {
	origin: (origin, callback) => {
		if (!origin || WHITELISTED_ORIGINS.includes(origin)) {
			callback(null, true); // Allow the request
		} else {
			callback(new Error('Not allowed by CORS')); // Reject the request
		}
	}
};

module.exports = corsOptions;
