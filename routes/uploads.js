const { Router } = require ('express');
const { check } = require('express-validator');

const { 
    uploadFiles, 
    updateImgs,
    showImage,
    updateImagesCloudinary
  } = require('../controllers/uploads');

const { 
    colletionExists 
  } = require('../helpers');

const {
    validateFields,
    validateFilesUpload,
    validateJWT  
  } = require('../middlewares');


const router = Router();

router.get('/:colletion/:id', [  
  check('id','El Id no es un ID válido').isMongoId(),
  check('colletion').custom( c => colletionExists ( c, ['users', 'products'] ) ),
  validateFields
], showImage )

router.post('/', validateFilesUpload , uploadFiles);

router.put('/:colletion/:id', [
  validateJWT,
  validateFilesUpload,
  check('id','El Id no es un ID válido').isMongoId(),
  check('colletion').custom( c => colletionExists ( c, ['users', 'products'] ) ),
  validateFields  
], updateImagesCloudinary);
//], updateImgs);


module.exports = router;
