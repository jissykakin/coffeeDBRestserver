

const dbValidators =        require('./db-validators');
const generateJWT =         require('./generate-jwt');
const googleValidators =    require('./google-validators');
const uploasFiles =         require('./upload-files');


module.exports= {
    ...dbValidators,
    ...generateJWT,
    ...googleValidators,
    ...uploasFiles
}