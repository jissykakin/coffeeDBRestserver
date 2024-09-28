const { response } = require("express");



const validateFilesUpload =  ( req, res = response, next ) => {
   
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.uploadFile)  {
        return res.status(400).json({
            msg: 'No hay archivos que subir - ValidateFilesUpload'
        });        
    }    

    next();
}

module.exports = {
    validateFilesUpload
}