const { Router } = require ('express');
const { check } = require('express-validator');


const { isRoleValidate , isExistEmail , existUserById } = require('../helpers/db-validators');

const {
  validateFields,
  validateJWT,
  isAdminRole,
  isThisRoles
} = require('../middlewares');

const { usuariosGet, 
        usuariosPost, 
        usuarioPut, 
        usuarioDelete, 
        usuarioPatch } = require('../controllers/user');


const router = Router();

router.get('/', usuariosGet )

  router.post('/', [
    check('name', 'El nombre es Obligatorio').not().isEmpty(),
    check('password', 'El Password contener mas de 6 caracteres').isLength({ min: 6 }),
    check('email', 'El correo no es válido').isEmail(),
    check('email').custom ( isExistEmail ),
    check('role').custom ( isRoleValidate ),
    validateFields
  ], usuariosPost )

  router.put('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom ( existUserById ),
    check('role').custom ( isRoleValidate ),
    validateFields
  ],  usuarioPut )

  router.delete('/:id',[
    validateJWT,
    //isAdminRole,
    isThisRoles('ADMIN_ROLE', 'VENTAS_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom ( existUserById ),
    validateFields
  ], usuarioDelete )

  router.patch('/', usuarioPatch )


module.exports = router;