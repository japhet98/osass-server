const Requirement = require("../../../../../Model/api/v1/promotion/SMA/SMrequirementModel");

/**
 *
 * @route  api/v1/promo/requirement
 * @method POST
 * @access private
 * @description  admin to add application requirement
 */

exports.create = (req, res) => {
    const { requirement, type } = req.body;

    if (!requirement || !type)
        return res.status(400).json({ msg: "Enter all fields" });

    const newRequirement = new Requirement({
        requirement,
        type,
    });

    newRequirement
        .save()
        .then((doc) => {
            return res.json({ ntf: "Requirement addded successfully" });
        })
        .catch((err) =>
            res.status(400).json({ msg: "Adding requirement failed to add" })
        );
};

/**
 *
 * @route  api/v1/promo/requirement/:id
 * @method PUT
 * @access private
 * @description  admin to edit application requirement
 */

exports.update = (req, res) => {
    const { requirement, type, date_updated } = req.body;
    const _id = req.params._id;

    Requirement.findOne({ _id }).then((doc) => {
        if (!doc)
            return res.status(400).json({ msg: "Requirement Does not exist" });
    });

    Requirement.updateOne({ _id }, {
        $set: {
            requirement,
            type,
            date_updated,
        },
    }).then((doc) => res.j);
};

/**
 *
 * @route     api/v1/promo/requirement/:id
 * @method    DELETE
 * @access    private
 * @description admin to delete an appllication requirement;
 *
 */

exports.delete = (req, res) => {};

/**
 *
 * @route    api/v1/promo/requirement
 * @method   GET
 * @access   public
 * @description returns all application requirements;
 *
 */

exports.getall = (req, res) => {};

/**
 *
 * @route    api/v1/promo/requirement/:id
 * @method   GET
 * @access   public
 * @description returns one application requirements;
 *
 */

exports.getone = (req, res) => {};