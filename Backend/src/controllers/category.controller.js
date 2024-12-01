const categoryService = require("../services/category.service");
const statusCodes = require("../constants/statusCodes");

class CategoryController {
  async addCategory(req, res) {
    // Get the category data from the request body
    const category = req.body;

    try {
      // Create the category in the database
      await categoryService.createCategory(category.name, category.courses);

      // Send a success response
      res.status(statusCodes.CREATED).json({
        message: "Category added successfully",
      });
    } catch (error) {
      // Send an error response
      console.error(error);
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
        error: "An error occurred while adding category",
      });
    }
  }

  async getAllCategories(req, res) {
    try {
      const categories = await categoryService.getAllCategories();
      res.status(200).json(categories);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Failed to get all categories", error: error });
    }
  }
}

module.exports = new CategoryController();
