const router = require('express').Router();
const categoriesController = require('../controller/categories_C');
const { isValidId } = require('../middelware/categories_MID');
const { validValues } = require('../middelware/categories_MID');


router.get('/', categoriesController.getAllcategories);
router.post('/', validValues, categoriesController.addcategories);
router.get('/:id', isValidId, categoriesController.getOneCategory);

router.delete('/:id', isValidId, categoriesController.deleteCategory);

router.put('/:id', isValidId, validValues, categoriesController.updateCategory);

module.exports = router;
