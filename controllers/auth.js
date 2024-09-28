const { response, json } = require('express');
const bcryptjs = require('bcryptjs');

const { User }= require('../models');
const { generateJWT } = require('../helpers/generate-jwt');
const { googleVerify } = require('../helpers/google-validators');

const login = async (req, res =  response) =>  {
  
  const { email , password } = req.body;

  try {

    //verificar si el email existe
    const user = await User.findOne({ email });

    if ( !user ) {
        return res.status(400).json({
            msg: 'Usuario o Contraseña no son correctos - Correo'
        });
    }
    
    // sie el usuario no está activo
    if ( !user.state ) {
        return res.status(400).json({
            msg: 'Usuario o Contraseña no son correctos - Estado'
        });
    }

    //verificar la contraseña

    const validatePassword = bcryptjs.compareSync(password, user.password);
    if ( !validatePassword ) {
        return res.status(400).json({
            msg: 'Usuario o Contraseña no son correctos - Password'
        });
    }

    //generar el JWT
    
    const token = await generateJWT( user.id );
    
    
    res.json ({
        user,
        token
    })
    
  } catch (error) {
    console.log(error)
    res.status(500).json({
        msg: 'Hable con el administrador'
    });
  }
  
    

}


const googleSignIn = async ( req, res=response ) => {
    const { id_token } = req.body;

    try {

        const { name, img, email } = await googleVerify( id_token );
       
       
        
        let user = await User.findOne({ email });
       

        if ( !user ) {
            // se crea el usuario
            const data = {
                name,
                email,
                password: ':P',
                img,                
                google: true
            }

            console.log( data );
            

            user = new User( data );

            await user.save();
        }
        
        //si el usuario de BD 
        if (!user.state) {
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario Bloqueado'
            });
        }


         //generar el JWT  
        const token = await generateJWT( user.id );
    

        res.json({
            user,
            token
        });

    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'El Token no se pudo verificar'
        });
        
    }

   
}


module.exports = {
    login,
    googleSignIn
}