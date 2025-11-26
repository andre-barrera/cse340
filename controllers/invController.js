const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
    errors: null
  })
}

/* ***************************
 *  Build inventory item detail view
 * ************************** */
invCont.buildByInvId = async function (req, res, next) {
  const invId = req.params.invId
  const data = await invModel.getInventoryByInvId(invId)
  const itemData = data[0] // Expecting a single item
  let nav = await utilities.getNav()
  const detailHTML = await utilities.buildDetailView(itemData)

  res.render("./inventory/detail", {
    title: `${itemData.inv_make} ${itemData.inv_model}`,
    nav,
    detailHTML,
    errors: null
  })
}


invCont.triggerError = async function (req, res, next) {
  throw new Error("Intentional 500 error for testing")
}

module.exports = invCont
