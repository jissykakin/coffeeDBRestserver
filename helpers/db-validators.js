const { Role , User , Category, Product } = require('../models');


const isRoleValidate = async (role = '') => {
    const existeRole = await Role.findOne({ role });
    if ( !existeRole ){
      throw new Error( `El role ${ role } no esta registrado como rol valido ` );
    }
  }

const isExistEmail = async ( email = '') => {
  const existeEmail = await User.findOne({ email })
    if ( existeEmail){
        throw new Error( `El Email ${ email } ya esta registrado ` );
    }
}

const existUserById = async ( id ) => {
    const existUser = await User.findById( id );
      if ( !existUser){
          throw new Error( `El Id ${ id } no existe` );
      }
}

const existCategoryById = async ( id ) => {
  const existCategory = await Category.findById( id );
    if ( !existCategory){
        throw new Error( `El Id ${ id } de la categoria no existe` );
    }
}


const existProductById = async ( id ) => {
  const existProduct = await Product.findById( id );
    if ( !existProduct){
        throw new Error( `El Id ${ id } de la producto no existe` );
    }
}

/**
 * Validar Colecciones Permitidas
 */

const colletionExists = ( colletion = '', colletions = []) => {
  const incluided = colletions.includes ( colletion );

  if ( !incluided ) { 
    throw new Error(`La Coleccion ${ colletion } no es permitida, solo se permiten ${ colletions }`);
    
  }

  return true;
}
  




  module.exports = {
    isRoleValidate,
    isExistEmail,
    existUserById,
    existCategoryById,
    existProductById,
    colletionExists
}  