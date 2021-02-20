const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const CommitteeMemberSchema = new Schema({
    member: { type: Mongoose.Types.ObjectId, ref: "user" },
    committee: { type: Mongoose.Types.ObjectId, ref: "committee" },
    appointee: { type: String },
    status: { type: String },
    response_date: { type: Date },
    appointed_date: { type: Date },
});

module.exports = CommitteeMember = Mongoose.model(
    "committeemember",
    CommitteeMemberSchema
);