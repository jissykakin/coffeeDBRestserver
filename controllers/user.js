const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const { User } = require('../models');

const usuariosGet = async (req = request, res = response ) => {
   // const { nombre, page = 1 , limit } = req.query
    const { limit = 5 , desde = 0 } = req.query;
    const query =  { state : true };
/*
// proceso para generacion de usuario y total por separado
    const users = await User.find( query )
    .skip( Number( desde ))
    .limit(Number( limit ));

    const total = await User.countDocuments( query );
*/

//proceso optimizado con una promesa
    const [ total, users ] = await Promise.all([
        User.countDocuments( query ),
        User.find( query )
            .skip( Number( desde ))
            .limit(Number( limit ))
    ]);

    res.json({
        total,
        users
    });

}

const usuariosPost = async (req = request, res = response ) => {
    const { name, email, password, role } = req.body;

    const user = new User({ name, email, password, role });

    // verificar si el correo existe
    /*
    const existeEmail = await User.findOne({ email })
    if ( existeEmail){
        return res.status(400).json( {
           msg: 'El correo ya esta registrado'
        })
    }*/

    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);


    //Guardar en DB
    await user.save();

    res.json({
        user
    });

}

const usuarioPut = async ( req = request, res = response ) => {

    const { id } = req.params;
    const { _id, password, google, ...userrest } = req.body;


    if ( password ) {
        ///Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        userrest.password = bcryptjs.hashSync(password, salt);
    }


    const user = await User.findByIdAndUpdate( id, userrest ,  { new: true });

        res.json({        
            user
        })
    }


const usuarioPatch =  (req, res ) => {
    res.json({
        msg: 'Patch API - Controlador '
    })
}

const usuarioDelete = async (req = request, res = response) => {

    const { id } = req.params;
    const userAuth  = req.usuario;

    //fisicamente como lo borramos
   // const user = await User.findByIdAndDelete( id );

    const user = await User.findByIdAndUpdate(id, { state : false}, { new: true });

    res.json({
        user
    })
}


module.exports = {
    usuariosGet,
    usuariosPost,
    usuarioPut,
    usuarioPatch,
    usuarioDelete
}