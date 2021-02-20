const User = require("../../../../Model/api/v1/common/userModel");
const Auth = require("../../../../Model/api/v1/common/authModel");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Mongoose = require("mongoose");

dotenv.config();
/**
 * @route               /api/v1/common/auth
 * @method              POST
 * @access              public
 * @description         Authenticates a user with valid credentials
 *
 */

exports.login = (req, res) => {
    const { email, password } = req.body;

    // Store the user ID, and rank to token;
    let user;

    if (!email || !password)
        return res.status(400).json({ msg: "All fields required" });

    Auth.findOne({ email })
        .then((doc) => {
            if (!doc) return res.status(400).json({ msg: "Invalid Credentials" });
            if (doc) return User.findById({ _id: doc._id });
        })
        .then((doc) => {
            if (doc) return (user = doc);
        })
        .then(() => {
            return Auth.findOne({ email });
        })
        .then((doc) => {
            if (!doc) return res.status(400).json({ msg: "Invalid Credentials" });

            // Validate Password
            bcrypt.compare(password, doc.password).then((isMatch) => {
                if (!isMatch)
                    return res.status(400).json({ msg: "Invalid Credentials" });

                // Sign Token to user
                jwt.sign({ id: doc.id, rank: user.rank },
                    process.env.TOKEN_SECRET, { expiresIn: "1d" },
                    (err, token) => {
                        if (err) throw err;
                        res.json({
                            token,
                            user,
                            exp: 1516234022,
                        });
                    }
                );
            });
        });
};

/**
 *
 * @route /api/v1/common/auth
 * @method GET
 * @access private
 * @description Helps in user authentication by getting the user details using the jwt token through a middleware function;
 * @param {*} req
 * @param {*} res
 *
 */

exports.getuser = (req, res) => {
    const _id = Mongoose.Types.ObjectId(req.user.id);
    User.findById({ _id })
        .then((user) => {
            if (!user) return res.status(400).json({ msg: "user does not exist" });
            res.json(user);
        })
        .catch((err) => res.status(400).json({ msg: err }));
};

/**
 *
 * @route /api/v1/common/auth/refresh
 * @method GET
 * @access private
 * @description Returns a refresh token to the user when token expires;
 * @param {*} req
 * @param {*} res
 */

exports.refresh = (req, res) => {
    const tok = req.token;
    const _id = Mongoose.Types.ObjectId(req.user.id);

    // Auth.findById({ _id }).then((doc) => {
    //     if (!doc) return res.status(400).json({ msg: "User does not exist" });
    //     if (doc.token !== tok) return res.json({ token: "", user: {} });

    //     jwt.sign({ id: doc.id, rank: user.rank },
    //         process.env.TOKEN_SECRET, { expiresIn: "1d" },
    //         (err, token) => {
    //             if (err) throw err;
    //             res.json({
    //                 token,
    //                 user,
    //                 exp: 1516234022,
    //             });
    //         }
    //     );
    // });
};