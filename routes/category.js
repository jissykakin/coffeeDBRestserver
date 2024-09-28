const { Router } = require ('express');
const { check } = require('express-validator');

const { existCategoryById } = require('../helpers/db-validators');


const { 
  createCategory, 
  deleteCategory,
  getCategories, 
  getCategoryByID,
  updateCategory
} = require('../controllers/category');

const {
    validateFields,
    validateJWT,
    isAdminRole 
  } = require('../middlewares');


  const router = Router();


  router.get('/', getCategories );


  router.get('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom ( existCategoryById ),
    validateFields
  ], getCategoryByID );


  router.post('/', [ 
    validateJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    validateFields
  ], createCategory );


  router.put('/:id',[ 
    validateJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom ( existCategoryById ),
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    validateFields
  ], updateCategory  );


  router.delete('/:id', [ 
    validateJWT,
    isAdminRole,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom ( existCategoryById ),    
    validateFields
  ], deleteCategory );


  module.exports = router;