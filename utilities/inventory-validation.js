const { body, validationResult } = require("express-validator")
const utilities = require("./")

const invValidate = {}

/* *******************************
 * Classification Validation Rules
 *********************************/
invValidate.classificationRules = () => {
  return [
    body("classification_name")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Please provide a classification name.")
      .matches(/^[A-Za-z0-9 ]+$/)
      .withMessage("Classification must contain only letters and numbers.")
  ]
}

/* *******************************
 * Check classification data
 *********************************/
invValidate.checkClassificationData = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav()
    return res.render("./inventory/add-classification", {
      title: "Add New Classification",
      nav,
      errors,
      classification_name: req.body.classification_name
    })
  }
  next()
}

/* *******************************
 * Inventory Validation Rules
 *********************************/
invValidate.inventoryRules = () => {
  return [
    body("inv_make")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Make must be at least 3 characters."),
    body("inv_model")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Model must be at least 3 characters."),
    body("inv_year")
      .isInt({ min: 1900, max: 2100 })
      .withMessage("Enter a valid year."),
    body("inv_price")
      .isFloat({ min: 0 })
      .withMessage("Price must be a positive number."),
    body("inv_miles")
      .isInt({ min: 0 })
      .withMessage("Miles must be a positive number."),
    body("inv_color")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Color must be at least 3 characters."),
    body("inv_image")
      .trim()
      .isLength({ min: 5 })
      .withMessage("Image path is required."),
    body("inv_thumbnail")
      .trim()
      .isLength({ min: 5 })
      .withMessage("Thumbnail path is required."),
  ]
}

/* *******************************
 * Check inventory data
 *********************************/
invValidate.checkInventoryData = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav()
    let classificationSelect = await utilities.buildClassificationList(req.body.classification_id)
    return res.status(400).render("./inventory/add-inventory", {
      title: "Add New Inventory Item",
      nav,
      errors: errors.array(),
      classificationSelect,
      ...req.body 
    })
  }
  next()
}

module.exports = invValidate
