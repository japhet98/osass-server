const Mongoose = require("mongoose");
const Shema = Mongoose.Schema;

const UserSchema = new Shema({
    _id: { type: Mongoose.Types.ObjectId, required: true },
    firstname: { type: String },
    lastname: { type: String },
    othername: { type: String },
    email: { type: String },
    residence: { type: String },
    phone: { type: String },
    rank: { type: String },
});

module.exports = UserModel = Mongoose.model("user", UserSchema);