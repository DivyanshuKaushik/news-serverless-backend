const categoryRouter = require("express").Router();
const { isEditor } = require("../middlewares/authenticate");
const { check } = require("express-validator");
const { addCategory, getCategory, deleteCategory } = require("../controllers/category");

// @route POST /api/addCategory
// @desc add news category
// @access Private admin/editor
categoryRouter.post(
  "/addCategory",
  [check("category", "Category is required!").notEmpty()],
  addCategory
);

// @route GET /api/getCategory
// @desc get news category
// @access Public 
categoryRouter.get(
  "/getCategory",
  getCategory
);

// @route DELETE /api/deleteCategory/:id
// @desc delete category
// @access Private admin/editor
categoryRouter.delete(
  "/deleteCategory/:id",
  deleteCategory
);

module.exports = categoryRouter

