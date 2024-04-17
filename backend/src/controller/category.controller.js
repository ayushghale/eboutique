import Category from "../model/category.model.js";
import { errorHandler, successHandler } from "../uitls/response.js";

const CategoryController = {
  // add new category
  getAllCategories: async (req, res) => {
    try {
      const categories = await Category.findAll();
      return successHandler(res, categories);
    } catch (error) {
      return errorHandler(res, error.message, 500);
    }
  },

  // get category by id
  getCategoryById: async (req, res) => {
    try {
      const categoryId = req.params.id;
      const category = await Category.findByPk(categoryId);
      if (category) {
        return successHandler(res, category);
      } else {
        return errorHandler(res, "Category not found", 404);
      }
    } catch (error) {
      return errorHandler(res, error.message, 500);
    }
  },

  // add new category
  addCategory: async (req, res) => {
    try {
      const image = req.image;
      const { name,description } = req.body;

      const newCategory = await Category.create({
        name: name,
        description:description,
        image: image,
      });
      return successHandler(res, newCategory);
    } catch (error) {
      return errorHandler(res, error.message, 500);
    }
  },

  // update category
  updateCategory: async (req, res) => {
    try {
      const categoryId = req.params.id;
      const { name,description } = req.body;

      const category = await Category.findByPk(categoryId);


      if (category) {
        await category.update(
          {
            name: name,
            description:description,
            image: req.image || category.image,
          },
          {
            where: {
              id: categoryId,
            },
          }
        );
        return successHandler(res, category);
      } else {
        return errorHandler(res, "Category not found", 404);
      }
    } catch (error) {
        return errorHandler(res, error.message, 500);
    }
  },
  // delete category
  deleteCategory :async (req, res) =>{
    try {
      const category = await Category.destroy({ where: { id: req.params.id } });
      return successHandler(res, category);
    } catch (error) {
      return errorHandler(res, error.message, 500);
    }
  },

  updateStatus: async (req, res) => {
    try {
      const categoryId = parseInt(req.params.id);
      let status = "active";
      const category = await Category.findByPk(categoryId);


      if (category) {

        if (category.status === "active") {
          status = "inactive";
        }

        await category.update(
          {
            status: status,
          },
          {
            where: {
              id: categoryId,
            },
          }
        );
        return successHandler(res, category);
      } else {
        return errorHandler(res, "Category not found", 404);
      }
    } catch (error) {
        return errorHandler(res, error.message, 500);
    }
  },
};

export default CategoryController;
