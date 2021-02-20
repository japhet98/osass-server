const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const SMApplicationSchema = new Schema({});

module.exports = SMApplication = Mongoose.model(
    "smapplication",
    SMApplicationSchema
);