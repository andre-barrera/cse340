// Needed resources

const express = require("express")
const router = new express.Router()
const invController = require("../controllers/invController")
const Util = require("../utilities/") 
const invValidate = require("../utilities/inventory-validation")

// Route to build inventory by classification view
router.get(
  "/type/:classificationId",
  Util.handleErrors(invController.buildByClassificationId)
)

// Route to build vehicle detail view
router.get(
  "/detail/:invId",
  Util.handleErrors(invController.buildByInvId)
)

router.get(
  "/trigger-error",
  Util.handleErrors(invController.triggerError)
)

router.get(
  "/",
  Util.handleErrors(invController.buildManagement)
);

router.get(
  "/add-classification",
  Util.handleErrors(invController.buildAddClassification)
);

router.post(
  "/add-classification",
  invValidate.classificationRules(),
  invValidate.checkClassificationData,
  Util.handleErrors(invController.addClassification)
);

router.get(
  "/add-inventory",
  Util.handleErrors(invController.buildAddInventory)
);

router.post(
  "/add-inventory",
  invValidate.inventoryRules(),
  invValidate.checkInventoryData,
  Util.handleErrors(invController.addInventory)
);


module.exports = router
