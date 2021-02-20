const Committeemember = require("../../../../Model/api/v1/common/commiteememberModel");
const Committee = require("../../../../Model/api/v1/common/committeeModel");

/**
 *
 * @route       api/v1/common/committeemember
 * @method      POST
 * @access      private
 * @description Admin can create a new committeemember;
 *
 */

exports.create = (req, res) => {
    const { member, committee, appointee, appointed_date } = req.body;

    // Validate data
    if (!member || !committee || !appointee || !appointed_date)
        return res.status(400).json({ msg: "Enter all fields" });

    let committee_id;
    Committee.findOne({ name: committee })
        .then((doc) => {
            if (doc) return (committee_id = doc._id);
        })
        .then(() => {
            // Create new Committeemember object;
            const newCommitteemember = new Committeemember({
                member,
                committee: committee_id,
                appointee,
                appointed_date,
            });

            newCommitteemember
                .save()
                .then((doc) => {
                    Committee.updateOne({ _id: committee_id }, { $push: { members: doc._id } }).then(() => {
                        return res.json({ ntf: "Committeemember created successfully" });
                    });
                })
                .catch((err) =>
                    res.status(400).json({ msg: "Committeemember creating failed" })
                );
        });
};

/**
 *
 * @route   api/v1/common/committeemember
 * @method  GET
 * @access  private
 * @description returns all committeemembers available to only logged in users;
 *
 */

exports.getall = (req, res) => {
    Committeemember.find({})
        .populate("member")
        .populate("committee")
        .exec((err, result) => {
            if (err)
                return res.status(400).json({ msg: "Committeemember Fetch Failed" });
            return res.json(result);
        });
};

/**
 *
 * @route api/v1/common/committeemember/:id
 * @method GET
 * @access private
 * @description returns only one committeemember to logged in Users;
 */

exports.getone = (req, res) => {
    const { id } = req.params;

    Committeemember.findOne({ _id: id })
        .populate("member")
        .populate("committee")
        .exec((err, result) => {
            if (err)
                return res.status(400).json({ msg: "Committeemember Fetch Failed" });
            return res.json(result);
        });
};

/**
 *
 * @route  api/v1/common/committeemember/:id
 * @method PUT
 * @access private
 * @description updates only one user;
 *
 */

exports.update = (req, res) => {
    const { member, committee, appointee, appointed_date } = req.body;

    const { id } = req.params;

    let committee_id;
    Committee.findOne({ name: committee })
        .then((doc) => {
            if (doc) return (committee_id = doc._id);
        })
        .then(() => {
            Committeemember.findOne({ _id: id }).then((doc) => {
                if (!doc)
                    return res
                        .status(400)
                        .json({ msg: "Committeemember is not available" });
                Committeemember.updateOne({ _id: id }, {
                    $set: {
                        member,
                        appointed_date,
                        committee: committee_id,
                        appointee,
                    },
                })

                .then(() => {
                        return res.json({ ntf: "Committeemember Updated successfully" });
                    })
                    .catch((err) =>
                        res.status(400).json({ msg: "Committeemember update failed" })
                    );
            });
        });
};

/**
 *
 * @route api/v1/common/committeemember
 * @method DELETE
 * @access private
 * @description deletes a committeemember by an admin;
 *
 */

exports.delete = (req, res) => {
    const { id } = req.params;

    Committeemember.findOne({ _id: id }).then((doc) => {
        if (!doc)
            return res.status(400).json({ msg: "Committeemember is not available" });
        Committee.updateOne({ _id: doc.committee }, { $pull: { members: doc._id } }).then(() => {
            Committeemember.deleteOne({ _id: id })
                .then((doc) =>
                    res.json({ ntf: "Committeemember deleted successfully" })
                )
                .catch((err) =>
                    res.status(400).json({ msg: "Committeemember deleted successfully" })
                );
        });
    });
};

/**
 *
 * @route api/v1/common/committeemember/respond/:id
 * @method PUT
 * @access private
 * @description allows a staff to approve or reject a committee appointment;
 *
 */

exports.respondAppointment = (req, res) => {
    const { status, response_date } = req.body;
    const { _id } = req.params.id;

    Committeemember.findOne({ _id }).then((doc) => {
        if (!doc)
            return res.status(400).json({ msg: "Committeemember is not available" });
        Committeemember.updateOne({ _id }, {
                $set: {
                    status,
                    response_date,
                },
            })
            .then(() =>
                res.json({
                    ntf: "Committee Appointment Response submitted successfully",
                })
            )
            .catch(() =>
                res
                .status(400)
                .json({ msg: "Committee Appointment Response submission failed" })
            );
    });
};

/**
 *
 * @route  api/v1/common/commmitteemember/committee/
 * @method GET
 * @access private
 * @description Returns all committee an individual have participated;
 *
 */

exports.getcommitteejoined = (req, res) => {
    const _id = req.user.id;

    Committeemember.find({ member: _id })
        .populate("member")
        .populate("committee")
        .exec((err, result) => {
            if (err)
                return res.status(400).json({ msg: "Committees joined fetch faild" });
            res.json(result);
        });
};