const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

exports.AuthMiddleware = (req, res, next) => {
    const token = req.headers["x-access-token"] || req.headers["authorization"];

    // Checks if theres token;
    if (!token)
        return res.status(401).json({ msg: "No token, authorization denied" });

    // Cheks if token is valid;
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ msg: err.message });
        }
        if (decoded) {
            req.user = decoded;
            req.token = token;
            next();
        }
    });
};

exports.AdminMiddleware = (req, res, next) => {
    const token = req.headers["x-access-token"] || req.headers["authorization"];

    //    Checks if there's token;
    if (!token)
        return res.status(401).json({ msg: "No token, authorization denied" });

    // Checks if token is valid;
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ msg: err.message });
        }
        if (decoded) {
            // Checks if user is admin;
            if (decoded.rank !== "admin")
                return res.status(401).json({
                    msg: "Authorization Denied",
                });

            req.user = decoded;
            req.token = token;
            next();
        }
    });
};