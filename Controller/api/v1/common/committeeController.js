const Committee = require("../../../../Model/api/v1/common/committeeModel");

/**
 *
 * @route       api/v1/common/committee
 * @method      POST
 * @access      private
 * @description Admin can create a new committee;
 *
 */

exports.create = (req, res) => {
    const { name, description, vision, mission, date_created } = req.body;

    // Validate data
    if (!name || !vision || !mission || !date_created)
        return res.status(400).json({ msg: "Enter all fields" });

    // Create new Committee object;

    const newCommittee = new Committee({
        name,
        description,
        vision,
        mission,
        date_created,
    });

    newCommittee
        .save()
        .then((doc) => {
            return res.json({ ntf: "Committee created successfully" });
        })
        .catch((err) => res.status(400).json({ msg: "Committee creating failed" }));
};

/**
 *
 * @route   api/v1/common/committee
 * @method  GET
 * @access  private
 * @description returns all committees available to only logged in users;
 *
 */

exports.getall = (req, res) => {
    Committee.find({})
        .then((doc) => {
            return res.json(doc);
        })
        .catch((err) => res.status(400).json({ msg: "Committees fetch failed" }));
};

/**
 *
 * @route api/v1/common/committee/:id
 * @method GET
 * @access private
 * @description returns only one committee to logged in Users;
 */

exports.getone = (req, res) => {
    const { id } = req.params;

    Committee.findOne({ _id: id })
        .then((doc) => {
            return res.json(doc);
        })
        .catch((err) => res.status(400).json({ msg: "Committee fetch failed" }));
};

/**
 *
 * @route  api/v1/common/committee/:id
 * @method PUT
 * @access private
 * @description updates only one user;
 *
 */

exports.update = (req, res) => {
    const { name, description, vision, mission, date_created } = req.body;

    const { id } = req.params;

    Committee.findOne({ _id: id }).then((doc) => {
        if (!doc)
            return res.status(400).json({ msg: "Committee is not available" });
        Committee.updateOne({ _id: id }, {
                $set: {
                    name,
                    description,
                    date_created,
                    vision,
                    mission,
                },
            })
            .then(() => {
                return res.json({ ntf: "Committee Updated successfully" });
            })
            .catch((err) => res.status(400).json({ msg: "Committee update failed" }));
    });
};

/**
 *
 * @route api/v1/common/committee
 * @method DELETE
 * @access private
 * @description deletes a committee by an admin;
 *
 */

exports.delete = (req, res) => {
    const { id } = req.params;

    Committee.findOne({ _id: id }).then((doc) => {
        if (!doc)
            return res.status(400).json({ msg: "Committee is not available" });
        Committee.deleteOne({ _id: id })
            .then((doc) => res.json({ ntf: "Committee deleted successfully" }))
            .catch((err) =>
                res.status(400).json({ msg: "Committee deleted successfully" })
            );
    });
};