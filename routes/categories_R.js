const router = require('express').Router();
const categoriesController = require('../controller/categories_C');


router.get('/', categoriesController.getAllcategories);


router.post('/', categoriesController.addcategories);

router.get('/:id', categoriesController.getOneCategory);


router.delete('/:id', categoriesController.deleteCategory);


router.put('/:id', categoriesController.updateCategory);

module.exports = router;