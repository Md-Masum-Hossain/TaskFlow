import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import generateToken from '../utils/generateToken.js';
import asyncHandler from '../utils/asyncHandler.js';

class AppError extends Error {
	constructor(message, statusCode = 500) {
		super(message);
		this.statusCode = statusCode;
		Error.captureStackTrace(this, this.constructor);
	}
}

const buildUserResponse = (user) => ({
	id: user._id,
	name: user.name,
	email: user.email,
	createdAt: user.createdAt,
	updatedAt: user.updatedAt,
});

const setRefreshTokenCookie = (res, refreshToken) => {
	const isProd = process.env.NODE_ENV === 'production';

	res.cookie('refreshToken', refreshToken, {
		httpOnly: true,
		secure: isProd,
		sameSite: isProd ? 'strict' : 'lax',
		path: '/',
		maxAge: 7 * 24 * 60 * 60 * 1000,
	});
};

const clearRefreshTokenCookie = (res) => {
	const isProd = process.env.NODE_ENV === 'production';

	res.clearCookie('refreshToken', {
		httpOnly: true,
		secure: isProd,
		sameSite: isProd ? 'strict' : 'lax',
		path: '/',
	});
};

export const registerUser = asyncHandler(async (req, res, next) => {
	const { name, email, password } = req.body;

	if (!name || !email || !password) {
		throw new AppError('Name, email, and password are required', 400);
	}

	const existingUser = await User.findOne({ email: email.toLowerCase() });
	if (existingUser) {
		throw new AppError('Email is already in use', 409);
	}

	const hashedPassword = await bcrypt.hash(password, 10);
	const user = await User.create({
		name,
		email,
		password: hashedPassword,
	});

	const tokenPayload = {
		id: user._id.toString(),
		email: user.email,
	};

	const accessToken = generateToken(
		tokenPayload,
		process.env.JWT_SECRET || 'your_jwt_secret',
		process.env.ACCESS_TOKEN_EXPIRES_IN || '15m'
	);
	const refreshToken = generateToken(
		tokenPayload,
		process.env.REFRESH_TOKEN_SECRET || 'your_jwt_secret',
		process.env.REFRESH_TOKEN_EXPIRES_IN || '7d'
	);

	setRefreshTokenCookie(res, refreshToken);

	res.status(201).json({
		user: buildUserResponse(user),
		accessToken,
	});
});

export const loginUser = asyncHandler(async (req, res, next) => {
	const { email, password } = req.body;

	if (!email || !password) {
		throw new AppError('Email and password are required', 400);
	}

	const user = await User.findOne({ email: email.toLowerCase() });
	if (!user) {
		throw new AppError('Invalid credentials', 401);
	}

	const isPasswordValid = await bcrypt.compare(password, user.password);
	if (!isPasswordValid) {
		throw new AppError('Invalid credentials', 401);
	}

	const tokenPayload = {
		id: user._id.toString(),
		email: user.email,
	};

	const accessToken = generateToken(
		tokenPayload,
		process.env.JWT_SECRET || 'your_jwt_secret',
		process.env.ACCESS_TOKEN_EXPIRES_IN || '15m'
	);
	const refreshToken = generateToken(
		tokenPayload,
		process.env.REFRESH_TOKEN_SECRET || 'your_jwt_secret',
		process.env.REFRESH_TOKEN_EXPIRES_IN || '7d'
	);

	setRefreshTokenCookie(res, refreshToken);

	res.status(200).json({
		user: buildUserResponse(user),
		accessToken,
	});
});

export const logoutUser = asyncHandler(async(req, res, next) => {
	try {
		clearRefreshTokenCookie(res);

		res.status(200).json({
			message: 'Logged out successfully',
		});
	} catch (error) {
		next(error);
	}
});

export const me = asyncHandler(async (req, res, next) => {
	try {
		const user = await User.findById(req.user.id);
		if (!user) {
			throw new AppError('User not found', 404);
		}
		res.status(200).json({
			user: buildUserResponse(user),
		});
	} catch (error) {
		next(error);
	}
});

export const refreshToken = asyncHandler(async (req, res, next) => {
	const refreshTokenValue = req.cookies.refreshToken;

	if (!refreshTokenValue) {
		return res.status(401).json({ message: 'Refresh token missing' });
	}

	let decoded;
	try {
		decoded = jwt.verify(refreshTokenValue, process.env.REFRESH_TOKEN_SECRET || 'your_jwt_secret');
	} catch (error) {
		return res.status(401).json({ message: 'Invalid or expired refresh token' });
	}

	const user = await User.findById(decoded.id);
	if (!user) {
		return res.status(401).json({ message: 'User not found' });
	}

	const accessToken = generateToken(
		{ id: user._id.toString(), email: user.email },
		process.env.JWT_SECRET || 'your_jwt_secret',
		process.env.ACCESS_TOKEN_EXPIRES_IN || '15m'
	);

	res.status(200).json({ accessToken });
});
