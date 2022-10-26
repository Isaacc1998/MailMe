const { check } = require("express-validator");
const handleValidationErrors = require("./handleValidationErrors");

const validatePosts = [
  check("title")
    .exists({ checkFalsy: true })
    .isLength({ min: 1, max: 30 })
    .withMessage("Username must be between 1 and 30 characters"),
  check("content").exists({ checkFalsy: true }).isLength({ max: 1000 }),
  handleValidationErrors,
];

module.exports = validatePosts;
