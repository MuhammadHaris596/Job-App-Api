const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.cookies.token;

   
    if (!token) {
        return res.status(401).json({ message: 'Access Denied: No Token Provided!' });
    }

    try {
        const tokenData = jwt.verify(token, process.env.JWT_SECRET);
        console.log(tokenData)
        req.id = tokenData.userId;
        req.role = tokenData.role
        req.fullname = tokenData.fullname


        next();

    } catch (err) {
        res.status(400).json({ message: 'Invalid Token' });
    }
};

module.exports = verifyToken;