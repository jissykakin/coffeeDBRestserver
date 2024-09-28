const { response } = require("express");
const { ObjectId } = require('mongoose').Types;

const { User, Category, Product } = require('../models');
const { Result } = require("express-validator");


const colletionExists = [
    'users',
    'categories',
    'products',
    'roles'
]

const searchCategory = async ( term = '', res= response ) => {

    const isaMongoID = ObjectId.isValid ( term );

    if ( isaMongoID ){
        const category = await Category.findById( term )
                                    .populate( 'user', 'name' );
        

        return res.json( {
            results: ( category ) ? [ category ] : []
        });
    }

    const regex = new RegExp( term, 'i' );

    const categories = await Category.find ( { name: regex, state: true } )
                                    .populate( 'user', 'name' );

    res.json( {
        results: categories
    });

}

const searchProduct = async (term = '', res=response ) => {
    const isaMongoID = ObjectId.isValid ( term );

    if ( isaMongoID ){
        const product = await Product.findById( term )
                                    .populate( 'user', 'name' )
                                    .populate( 'category', 'name' );

        return res.json( {
            results: ( product ) ? [ product ] : []
        });
    }

    const regex = new RegExp( term, 'i' );

    const products = await Product.find ( { 
        $or: [ { name : regex }, { description : regex} ],
        $and: [{ state : true }]
    } )
                        .populate( 'user', 'name' )
                        .populate( 'category', 'name' );
    res.json( {
        results: products
    });
}

const searchUser = async (term = '', res=response ) => {
    const isaMongoID = ObjectId.isValid ( term );

    if ( isaMongoID ){
        const user = await User.findById( term );
        return res.json( {
            results: ( user ) ? [ user ] : []
        });
    }

    const regex = new RegExp( term, 'i' );

    const users = await User.find ( { 
        $or: [ { name : regex }, { email : regex} ],
        $and: [{ state : true }]
    } );
    res.json( {
        results: users
    });
}


const search = ( req, res= response ) => {
    const { colletion, term } = req.params;

    if ( !colletionExists.includes( colletion ) ){
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${colletionExists}`
        });
    }

    switch (colletion) {
        case 'users':
            searchUser ( term, res );
        break;
        case 'categories':
            searchCategory ( term , res )
        break;
        case 'products':
            searchProduct ( term, res )
        break;

        default:
            res.status(500).json({
                msg: 'se me olvido hacer esta busqueda'
            })
    }

    
}

module.exports = {
    search
}