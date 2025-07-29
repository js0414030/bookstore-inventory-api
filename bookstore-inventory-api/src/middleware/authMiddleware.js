const jwt = require('jsonwebtoken');
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'your_access_secret_here';

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) return res.status(401).json({ success: false, message: 'No token provided' });

    const token = authHeader.split(' ')[1];
    jwt.verify(token, JWT_ACCESS_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ success: false, message: 'Invalid token' });
        req.user = decoded;
        next();
    });
};
