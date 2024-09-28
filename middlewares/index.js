

const  validateFields       =   require('../middlewares/validate-fields');
const  validateJWT          =   require('../middlewares/validate-jwt');
const  valideteRoles        =   require('../middlewares/validate-roles');
const  validateFilesUpload  =   require('../middlewares/validate-files-upload');

module.exports = {
    ...validateFields,
    ...validateJWT,
    ...valideteRoles,
    ...validateFilesUpload
}