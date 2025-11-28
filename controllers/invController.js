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


invCont.buildManagement = async function (req, res) {
  let nav = await utilities.getNav();
  res.render("inventory/management", {
    title: "Inventory Management",
    nav,
    messages: req.flash(), 
  });
};

invCont.buildAddClassification = async (req, res) => {
  let nav = await utilities.getNav();
  res.render("inventory/add-classification", {
    title: "Add New Classification",
    nav,
    messages: req.flash()
  });
};

invCont.addClassification = async (req, res) => {
  const { classification_name } = req.body;

  const result = await invModel.addClassification(classification_name);

  if (result) {
    req.flash("success", `Classification "${classification_name.trim()}" added.`)

    let nav = await utilities.getNav()
    return res.status(201).render("inventory/management", {
      title: "Inventory Management",
      nav,
      messages: req.flash()
    })
  } else {
    req.flash("error", "Failed to add classification.")
    res.status(400).render("inventory/add-classification", {
      title: "Add New Classification",
      nav: await utilities.getNav(),
      messages: req.flash()
    })
  }
};


invCont.addInventory = async (req, res) => {
  const {
    inv_make,
    inv_model,
    inv_year,
    inv_price,
    inv_miles,
    inv_description,
    inv_color,
    classification_id,
    inv_image,
    inv_thumbnail
  } = req.body;

  const result = await invModel.addInventory(
    inv_make,
    inv_model,
    inv_year,
    inv_price,
    inv_miles,
    inv_description,
    inv_color,
    classification_id
  );

  if (result) {
    req.flash("success", `Inventory item "${inv_make} ${inv_model}" added.`);

    let nav = await utilities.getNav();
    return res.status(201).render("inventory/management", {
      title: "Inventory Management",
      nav,
      messages: req.flash()
    });
  }

  req.flash("error", "Failed to add inventory item.");

  let nav = await utilities.getNav();
  let classificationSelect = await utilities.buildClassificationList(classification_id);

  return res.status(400).render("inventory/add-inventory", {
    title: "Add New Inventory Item",
    nav,
    classificationSelect,
    messages: req.flash(),
    // sticky fields
    inv_make,
    inv_model,
    inv_year,
    inv_price,
    inv_miles,
    inv_description,
    inv_color
  });
};

invCont.buildAddInventory = async (req, res) => {
  let nav = await utilities.getNav();
  let classificationSelect = await utilities.buildClassificationList();

  res.render("inventory/add-inventory", {
    title: "Add New Inventory Item",
    nav,
    classificationSelect,
    messages: req.flash(),
    inv_make: "",
    inv_model: "",
    inv_year: "",
    inv_price: "",
    inv_miles: "",
    inv_description: "",
    inv_image: "",
    inv_thumbnail: "",
    inv_color: ""
  });
};



module.exports = invCont
