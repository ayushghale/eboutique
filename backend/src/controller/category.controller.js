import Category from '../model/category.model.js';

const CategoryController = {
    // add new category
    async getAllCategories(req, res) {

        try {
            const categories = await Category.findAll();
            res.status(200).json(categories);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    },

    // get category by id
    async getCategoryById(req, res) {
        try {
            const categoryId = req.params.id;
            const category = await Category.findByPk(categoryId);
            if (category) {
                res.status(200).json(category);
            } else {
                res.status(404).json("Category not found");
            }
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    },
    
    // add new category
    async addCategory(req, res) {
        try {
            const {name} = req.body;
            const newCategory = await Category.create({
                name: name
            });
            res.status(201).json("Category added successfully" + newCategory);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    },
    // update category
    async updateCategory(req, res) {
        try {
            const categoryId = req.params.id;
            const {newName} = req.body;
            const category = await Category.findByPk(categoryId);
            if (category) {
                await category.update(
                    {
                        name: newName,
                    },
                    {
                        where: {
                            id: categoryId,
                        },
                    }
                );
                res.status(200).json("Category updated successfully");
            } else {
                res.status(404).json("Category not found");
            }
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    },
    // delete category
    async deleteCategory(req, res) {
        try {
            const category = await Category.destroy({where: {id: req.params.id}});
            res.status(200).json(category);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    },
}

export default CategoryController;