import jwt from 'jsonwebtoken';

const generateToken = (payload, secret, expiresIn = '15m') => {
	if (!payload || !secret) {
		throw new Error('Payload and secret are required to generate a token');
	}

	return jwt.sign(payload, secret, { expiresIn });
};

export default generateToken;
