const express = require("express");
const menuController = require("../controllers/menu.controller");
const router = express.Router();
const upload = require("../middlewares/upload.middleware");

/**
 * @route GET api/menu
 * @description get menu list
 *@access public
 */
router.get("/", menuController.getMenu);

/**
 * @route POST api/menu
 * @description POST menu list
 *@access public
 */
router.post("/", menuController.createMenu);

/**
 * @route GET api/menu/:id
 * @description get single dish
 *@access public
 */
router.get("/:id", menuController.getSingleDish);

/**
 * @route PUT api/menu/:id
 * @description update dish
 *@access public
 */
router.put("/:id", menuController.updateMenu);

/**
 * @route DELETE api/menu/:id
 * @description delete dish
 *@access public
 */
router.delete("/:id", menuController.deleteDish);

module.exports = router;
