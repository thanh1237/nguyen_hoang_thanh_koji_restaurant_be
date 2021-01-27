const express = require("express");
const tableController = require("../controllers/table.controller");
const authentication = require("../middlewares/authentication");
const router = express.Router();

/**
 * @route GET api/table
 * @description Get list of table
 * @access public
//  */
router.get("/", tableController.getListOfTable);

/**
 * @route GET api/table/:id
 * @description Get a single table
 * @access Public
 */
router.get("/:id", tableController.getSingleTable);
/**
 * @route PUT api/table/:id
 * @description put a single table
 * @access public
 */
router.put(
  "/:id",
  authentication.loginRequired,
  tableController.updateSingleTable
);

/**
 * @route POST api/table
 * @description POST list of table
 * @access login required
 */
router.post("/", tableController.selectDate);

/**
 * @route DELETE api/table/:id
 * @description Delete a table
 * @access Login required
 */
router.delete(
  "/:id",
  authentication.loginRequired,
  tableController.deleteSingleTable
);

module.exports = router;
