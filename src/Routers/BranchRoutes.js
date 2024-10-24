const express = require('express');
const router = express.Router();
const branchController = require('../controllers/BranchControllers');


router.route('/')
    .post(branchController.createBranch)
    .get(branchController.getBranches);


router.get('/:id', branchController.getBranchById);


router.put('/:id', branchController.updateBranch);


router.delete('/:id', branchController.deleteBranch);

module.exports = router;
