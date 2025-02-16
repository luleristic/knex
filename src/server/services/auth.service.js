const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;
const EXPIRES_IN = process.env.JWT_EXPIRES_IN;

const generateToken = userId => {
	return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: EXPIRES_IN });
};

module.exports = {
	generateToken
};
