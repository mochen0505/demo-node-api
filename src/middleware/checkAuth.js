const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.send({
                    code: 2000,
                    message: 'Auth failed'
                })
            } else {
                req.decoded = decoded;
                next();
            }
        })
    } else {
        return res.send({
            code: 2000,
            message: 'Auth failed'
        })
    }
};