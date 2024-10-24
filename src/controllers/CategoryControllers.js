const Category = require('../models/CategorySchema');


exports.createCategory = async (req, res) => {
    try {
        const category = new Category(req.body);
        await category.save();
        res.status(200).json({
            status: "success",
            data: { category },
        });
    } catch (error) {
        return res.status(404).json({
            status: "fail",
            message: error.message
        });
    }
};

// Get all categories
exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find().populate('branch');
        res.status(200).json({
            status: "success",
            data: { categories },
        });
    } catch (error) {
        return res.status(404).json({
            status: "fail",
            message: error.message
        });
    }
};

// Get a category by ID
exports.getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id).populate('branch');
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json({
            status: "success",
            data: { category },
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a category
exports.updateCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json({
            status: "success",
            data: { category },
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a category
exports.deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
