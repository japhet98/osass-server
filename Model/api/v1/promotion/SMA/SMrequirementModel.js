const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const SMRequirementSchema = new Schema({
    requirement: { type: String, required: true },
    type: { type: String },
    date_created: { type: Date, default: Date.now },
    date_updated: { type: Date },
});

module.exports = SMRequirement = Mongoose.model(
    "smrequirement",
    SMRequirementSchema
);