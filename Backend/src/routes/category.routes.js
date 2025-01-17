const express = require("express");
const categoryController = require("../controllers/category.controller");

const router = express.Router();

router.post("/", categoryController.addCategory);
router.get("/", categoryController.getAllCategories);

module.exports = router;
