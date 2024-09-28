const { response } = require("express");
const { Category } = require("../models");


//obtenerCategorias - paginado - total - Populate
const getCategories  = async ( req, res = response) => {
  
    const { limit = 5 , desde = 0 } = req.query; 
    const query =  { state : true };

    const [ total, categories ] = await Promise.all([
        Category.countDocuments( query ),
        Category.find( query )
            .populate('user', 'name')
            .skip( Number( desde ))
            .limit(Number( limit ))
    ]);

    res.json({
        total,
        categories
    });

   
}

//Obtener Categoria por ID : populate
const getCategoryByID = async ( req , res = response ) => {
    
    const { id } = req.params;

    const category = await Category.findById( id ).
        populate('user', 'name');

    if ( !category.state ) {
        res.status(400).json({
           msg: 'Categoria se encuentra desactivada'
        });
    }

    res.json( category );
}

// crear categoria
const createCategory = async (req , res = response) => {
    
    const name = req.body.name.toUpperCase();
    
    const existCategory = await Category.findOne({ name });

    if (existCategory) {
        return res.status(400).json({
            msg: `La Categoria ${ name }, ya existe`
        });
    }

    const data = {
        name,
        user: req.usuario._id 
    }

    const category = new Category ( data );

    await category.save();

    res.status(201).json(category)

}

// Actualizar Categoria
const updateCategory = async ( req, res = response ) => {
    
    const { id } = req.params;
    const { state, user, ...dataCategory } = req.body

    dataCategory.name = dataCategory.name.toUpperCase();
    dataCategory.user = req.usuario._id

     /*
    const data = {
        name : dataCategory.name ,
        state : dataCategory.state,
        user: req.usuario._id
    }*/

    const category = await Category.findByIdAndUpdate( id, dataCategory , { new: true })
                                                    .populate('user', 'name');

    res.json({
        category
    })

}

// desactivar o Borrar categoria
const deleteCategory = async ( req, res= response) => {
    const { id } = req.params;
 
    const category = await Category.findByIdAndUpdate(id, { state : false } , { new: true });

    res.json({
        category
    })

}


module.exports = {
    createCategory,
    deleteCategory,
    getCategories,
    getCategoryByID,
    updateCategory
}