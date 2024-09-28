const { Router } = require ('express');
const { check } = require('express-validator');

const { login , googleSignIn } = require('../controllers/auth');

const {
    validateFields    
  } = require('../middlewares');

const { isRoleValidate , isExistEmail , existUserById } = require('../helpers/db-validators');



const router = Router();

router.post('/login', [
    check('email','el Correo es Obligatorio').isEmail(),
    check('password','La constraseña es obligatoria').not().isEmpty()
    ,validateFields

], login );


router.post('/google', [
  check('id_token','El ID_Token es Obligatorio').not().isEmpty()
  ,validateFields
], googleSignIn );

module.exports = router;
