const Application = require("../../../../../Model/api/v1/promotion/SMA/SMapplicationModel");

/**
 *
 * @route    api/v1/sma/application
 * @method   POST
 * @access   private
 * @description only authenticated users can make application
 *
 */

exports.apply = (req, res) => {};

/**
 *
 * @route api/v1/sma/application
 * @method GET
 * @access private
 * @description  returns all application
 *
 */

exports.getapplications = (req, res) => {};

/**
 *
 * @route api/v1/sma/application/:id
 * @method GET
 * @access private
 * @description  returns only one application
 *
 */

exports.getapplication = (req, res) => {};

/**
 *
 * @route api/v1/sma/application/:user
 * @method GET
 * @access private
 * @description  returns all application for a user application
 *
 */

exports.getapplicationsbyuser = (req, res) => {};

/**
 *
 * @route api/v1/sma/application/:department
 * @method GET
 * @access private
 * @description  returns all application for a department
 *
 */

exports.getapplicationsbydepartment = (req, res) => {};

/**
 *
 * @route api/v1/sma/application/:faculty
 * @method GET
 * @access private
 * @description  returns all application for a faculty
 *
 */

exports.getapplicationsbyfaculty = (req, res) => {};

/**
 *
 * @route  api/v1/sma/receipt/:id
 * @method POST
 * @access private
 * @description allow hod,dean and management to either send aknowledge receipt of application
 *
 */

exports.acknowledgereceipt = (req, res) => {};

/**
 *
 * @route  api/v1/sma/grade/:id
 * @method POST
 * @access private
 * @description allow hod,dean and management to grade application
 *
 */

exports.grade = (req, res) => {};

/**
 *
 * @route  api/v1/sma/respond/:id
 * @method POST
 * @access private
 * @description allow hod,dean and management to either approve or reject application
 *
 */

exports.respond = (req, res) => {};