const path = require('path'); 
const fs = require('fs');

const cloudinary = require('cloudinary').v2;
cloudinary.config ( process.env.CLOUDINARY_URL );

const { response } = require("express");
const { uploadsFiles } = require("../helpers");

const { User, Product } = require('../models');


const uploadFiles = async (req, res= response) => {

    try {
        //const nameFile = await uploadsFiles(req.files, ['txt', 'md'], 'textos');
        const nameFile = await uploadsFiles(req.files, undefined, 'imgs');

        res.json({
           nameFile
        });
        
    } catch (msg) {
        res.status(400).json({ msg });        
    }
   
}


const updateImgs = async ( req, res= response ) => {

    const { id, colletion } = req.params;

    let model;

    try {

        switch ( colletion ) {
            case 'users':
                model = await User.findById ( id );
                if ( !model ){
                    return res.status(400).json ({
                        msg: `No existe un usuario con el Id ${ id }`
                    });
                }
                break;
    
            case 'products':
                model = await Product.findById ( id );
                if ( !model ){
                    return res.status(400).json ({
                        msg: `No existe un producto con el Id ${ id }`
                    });
                }
                model.user = req.usuario._id;
                
            break;
        
            default:
                return res.status(500).json ({ msg: 'Se me olvido validar eso'});
            
        }

        // limpiar imagen previas
        if ( model.img ) {
            // borrar la imagen del servidor
            const pathImage = path.join( __dirname, '../uploads', colletion, model.img );
            //validar si existe en archivo del filesystem
            if (fs.existsSync( pathImage )){
                fs.unlinkSync( pathImage );   // elimina el archivo de la ruta             
            }
        }

        // subir Archivo
        const nameFile = await uploadsFiles ( req.files, undefined, colletion );
        model.img = nameFile;    
    
        await model.save();
    
        res.json({
            model
        })
        
    } catch (msg) {
        res.status(400).json({ msg }); 
    }
   
}


const showImage = async ( req , res= response ) => {
    
    const { id, colletion } = req.params;
    
    let model;

    try {

        switch ( colletion ) {
            case 'users':
                model = await User.findById ( id );
                if ( !model ){
                    return res.status(400).json ({
                        msg: `No existe un usuario con el Id ${ id }`
                    });
                }
                break;
    
            case 'products':
                model = await Product.findById ( id );
                if ( !model ){
                    return res.status(400).json ({
                        msg: `No existe un producto con el Id ${ id }`
                    });
                }
               
                
            break;
        
            default:
                return res.status(500).json ({ msg: 'Se me olvido validar eso'});
            
        }

        // limpiar imagen previas
        if ( model.img ) {
            // borrar la imagen del servidor

           
            const pathImage = path.join( __dirname, '../uploads', colletion, model.img );
              //validar si existe en archivo del filesystem
            if (fs.existsSync( pathImage )){
                return res.sendFile( pathImage );   // elimina el archivo de la ruta             
            }           
            
        }
        
        //cargar imagen por default
        const pathImage = path.join( __dirname, '../assets/no-image.jpg' );
            //validar si existe en archivo del filesystem
        if (fs.existsSync( pathImage )){
            return res.sendFile( pathImage );   // elimina el archivo de la ruta             
        }else{
            res.json({
                msg: 'Falta Placeholder'
            });
        }

       
        
    } catch (msg) {
        console.log(msg);        
        res.status(400).json({ msg }); 
    }
   
}


const updateImagesCloudinary = async ( req, res= response ) => {

    const { id, colletion } = req.params;

    let model;

    try {

        switch ( colletion ) {
            case 'users':
                model = await User.findById ( id );
                if ( !model ){
                    return res.status(400).json ({
                        msg: `No existe un usuario con el Id ${ id }`
                    });
                }
                break;
    
            case 'products':
                model = await Product.findById ( id );
                if ( !model ){
                    return res.status(400).json ({
                        msg: `No existe un producto con el Id ${ id }`
                    });
                }
                model.user = req.usuario._id;
                
            break;
        
            default:
                return res.status(500).json ({ msg: 'Se me olvido validar eso'});
            
        }

        // limpiar imagen previas
        if ( model.img ) {
          const nameArr = model.img.split('/');
          const nameFile = nameArr [ nameArr.length -1 ];
          const [ public_id ] = nameFile.split('.');

          cloudinary.uploader.destroy( public_id );
        }

        // subir Archivo
        const { tempFilePath } = req.files.uploadFile;
        const { secure_url } =  await cloudinary.uploader
        .upload( tempFilePath )
        .catch((error) => {
            console.log(error);
        });

        model.img = secure_url;    
    
        await model.save();
    
        res.json({
            model
        })
        
    } catch (msg) {
        res.status(400).json({ msg }); 
    }
   
}

module.exports = {
    uploadFiles,
    updateImgs,
    showImage,
    updateImagesCloudinary
}