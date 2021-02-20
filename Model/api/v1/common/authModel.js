const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const AuthSchema = new Schema({
    email: { type: String, unique: true },
    password: { type: String },
    token: { type: String, unique: true },
});

module.exports = Auth = Mongoose.model("auth", AuthSchema);