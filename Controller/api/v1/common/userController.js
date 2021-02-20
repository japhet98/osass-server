const User = require("../../../../Model/api/v1/common/userModel");
const Auth = require("../../../../Model/api/v1/common/authModel");
const bcrypt = require("bcryptjs");
const Mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

/**
 * @route api/v1/common/users
 * @description Register new User
 * @method POST
 * @access public
 * @param {*} req
 * @param {*} res
 */
exports.register = (req, res) => {
    console.log(req.body);
    const {
        firstname,
        lastname,
        othername,
        email,
        phone,
        residence,
        rank,
        password,
    } = req.body;
    // Validation
    if (!firstname || !lastname || !email || !password) {
        return res.status(400).json({ msg: "Enter all fields" });
    }

    Auth.findOne({ email }).then((doc) => {
        if (doc) return res.status(400).json({ msg: "User already exist" });
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) throw err;

                // Creates new auth object;
                const newauth = new Auth({
                    email,
                    password: hash,
                });

                // Creates new user object
                newauth.save().then((auth) => {
                    const newUser = new User({
                        _id: auth._id,
                        firstname,
                        lastname,
                        othername,
                        email,
                        phone,
                        residence,
                        rank,
                    });
                    newUser.save().then((user) => {
                        res.json({ ntf: "User Registration successful" });
                    });
                });
            });
        });
    });
};

// const validateAdmin = (id) => {
//     User.findById({ _id: id }).then((doc) => {
//         if (!doc) return false;
//         if (doc.rank !== "admin") return false;
//         return true;
//     });
// };

/**
 *
 * @route  api/v1/common/users
 * @method GET
 * @access private
 * @description Returns all registered users to the administrator;
 * @param {*} req
 * @param {*} res
 */

exports.getall = (req, res) => {
    User.find({}).exec((err, result) => {
        if (err) return res.status(400).json({ msg: "Users Fetch Failed" });
        return res.json(result);
    });
};

/**
 *
 * @route  api/v1/common/users/:id
 * @method GET
 * @access private
 * @description Returns one registered users ;
 * @param {*} req
 * @param {*} res
 */

exports.getone = (req, res) => {
    const _id = Mongoose.Types.ObjectId(req.params.id);

    User.find({ _id }).exec((err, result) => {
        if (err) return res.status(400).json({ msg: "Users Fetch Failed" });
        return res.json(result);
    });
};

/**
 *
 * @route  api/v1/common/users/:id
 * @method DELETE
 * @access private
 * @description Deletes a user and it can only be done by the admin;
 * @param {*} req
 * @param {*} res
 */

exports.delete = (req, res) => {
    const _id = Mongoose.Types.ObjectId(req.params.id);
    User.findOne({ _id }).then((doc) => {
        if (!doc) return res.status(400).json({ msg: "User does not exist" });
    });

    Auth.findOneAndDelete({ _id })
        .then((doc) => {
            User.deleteOne({ _id })
                .then((doc) => res.json(doc))
                .catch((err) => res.status(400).json({ msg: "User Delete Fail" }));
        })
        .catch((err) => res.status(400).json({ msg: "User Delete Fail" }));
};

/**
 *
 * @route  api/v1/common/users/:id
 * @method PUT
 * @access private
 * @description Update User by both admin and user;
 * @param {*} req
 * @param {*} res
 */

exports.update = (req, res) => {
    const { phone, residence } = req.body;
    const _id = Mongoose.Types.ObjectId(req.params.id);

    User.findOne({ _id }).then((doc) => {
        if (!doc) return res.status(400).json({ msg: "User does not exist" });
    });

    User.updateOne({ _id }, {
            $set: {
                phone,
                residence,
            },
        })
        .then((doc) => res.json(doc))
        .catch((err) => res.status(400).json({ msg: "User Update fail" }));
};