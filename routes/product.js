const { Router } = require ('express');
const { check } = require('express-validator');

const { existProductById , existCategoryById } = require('../helpers/db-validators');


const { 
  createProduct, 
  deleteProduct,
  getProducts, 
  getProductByID,
  updateProduct
} = require('../controllers/product');

const {
    validateFields,
    validateJWT,
    isAdminRole 
  } = require('../middlewares');


  const router = Router();


  router.get('/', getProducts );


  router.get('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom ( existProductById ),
    validateFields
  ], getProductByID );


  router.post('/', [ 
    validateJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('category', 'El categoria no es un Id Válido').isMongoId(),
    check('category').custom ( existCategoryById ),
    validateFields
  ], createProduct );


  router.put('/:id',[ 
    validateJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom ( existProductById ),
    //check('category', 'El categoria no es un Id Válido').isMongoId(), 
    validateFields
  ], updateProduct  );


  router.delete('/:id', [ 
    validateJWT,
    isAdminRole,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom ( existProductById ),    
    validateFields
  ], deleteProduct );


  module.exports = router;