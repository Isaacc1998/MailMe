const { check } = require("express-validator");
const handleValidationErrors = require("./handleValidationErrors");

const validateMailinglist = [
  check("name")
    .exists({ checkFalsy: true })
    .isLength({ min: 3, max: 30 })
    .withMessage("Username must be between 3 and 30 characters"),
  handleValidationErrors,
];

module.exports = validateMailinglist;
