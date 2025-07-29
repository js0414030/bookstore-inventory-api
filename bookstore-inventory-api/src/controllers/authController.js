const jwt = require('jsonwebtoken');
const User = require('../models/User');

const {
    JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET,
    ACCESS_TOKEN_EXPIRY,
    REFRESH_TOKEN_EXPIRY,
    CLIENT_URL,
} = process.env;

// Generate Access Token
const generateAccessToken = (user) =>
    jwt.sign({ id: user._id, email: user.email }, JWT_ACCESS_SECRET, {
        expiresIn: ACCESS_TOKEN_EXPIRY || '15m',
    });

// Generate Refresh Token
const generateRefreshToken = (user) =>
    jwt.sign({ id: user._id }, JWT_REFRESH_SECRET, {
        expiresIn: REFRESH_TOKEN_EXPIRY || '7d',
    });

// Send refresh token in HttpOnly cookie
const sendRefreshToken = (res, token) => {
    res.cookie('jid', token, {
        httpOnly: true,
        path: '/api/auth/refresh_token', // only sent to this route
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
    });
};

exports.register = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ success: false, message: 'Email and password required.' });

        const userExist = await User.findOne({ email });
        if (userExist) return res.status(409).json({ success: false, message: 'User already exists.' });

        const user = new User({ email, password });
        await user.save();

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);
        sendRefreshToken(res, refreshToken);

        res.status(201).json({ success: true, accessToken, user: { id: user._id, email: user.email } });
    } catch (err) {
        next(err);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ success: false, message: 'Email and password required.' });

        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ success: false, message: 'Invalid email or password.' });

        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(401).json({ success: false, message: 'Invalid email or password.' });

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);
        sendRefreshToken(res, refreshToken);

        res.json({ success: true, accessToken, user: { id: user._id, email: user.email } });
    } catch (err) {
        next(err);
    }
};

exports.refreshToken = async (req, res, next) => {
    try {
        const token = req.cookies.jid;
        if (!token) return res.status(401).json({ success: false, message: 'No token provided' });

        jwt.verify(token, JWT_REFRESH_SECRET, async (err, payload) => {
            if (err) return res.status(401).json({ success: false, message: 'Invalid token' });

            const user = await User.findById(payload.id);
            if (!user) return res.status(401).json({ success: false, message: 'User not found' });

            const accessToken = generateAccessToken(user);
            const refreshToken = generateRefreshToken(user);
            sendRefreshToken(res, refreshToken);

            return res.json({ success: true, accessToken, user: { id: user._id, email: user.email } });
        });
    } catch (err) {
        next(err);
    }
};

exports.logout = (req, res) => {
    res.clearCookie('jid', { path: '/api/auth/refresh_token' });
    return res.json({ success: true, message: 'Logged out successfully' });
};
