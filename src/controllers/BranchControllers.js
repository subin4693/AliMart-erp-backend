const Branch = require('../models/BranchSchema');

// Create a new branch
exports.createBranch = async (req, res) => {
    const { name, location } = req.body;

    if (!name || !location) {
        return res.status(400).json({ message: 'Name and location are required.' });
    }

    try {
        const branch = new Branch(req.body);
        await branch.save();
        res.status(200).json({
            status: "success",
            data: { branch },
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


// Get all branches
exports.getBranches = async (req, res) => {
    try {
        const branches = await Branch.find();
        res.status(200).json({
            status: "success",
            data: { branches },
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a branch by ID
exports.getBranchById = async (req, res) => {
    try {
        const branch = await Branch.findById(req.params.id);
        if (!branch) {
            return res.status(404).json({ message: 'Branch not found' });
        }
        res.status(200).json({
            status: "success",
            data: { branch },
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a branch
exports.updateBranch = async (req, res) => {
    try {
        const branch = await Branch.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!branch) {
            return res.status(404).json({ message: 'Branch not found' });
        }
        res.status(200).json({
            status: "success",
            data: { branch },
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a branch
exports.deleteBranch = async (req, res) => {
    try {
        const branch = await Branch.findByIdAndDelete(req.params.id);
        if (!branch) {
            return res.status(404).json({ message: 'Branch not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
