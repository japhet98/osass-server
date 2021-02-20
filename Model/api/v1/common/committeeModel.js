const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const CommitteeSchema = new Schema({
    name: { type: String },
    description: { type: String },
    vision: { type: String },
    mission: { type: String },
    date_created: { type: Date },
    members: [{ type: Mongoose.Types.ObjectId, ref: "committeemember" }],
});

module.exports = Committee = Mongoose.model("committee", CommitteeSchema);