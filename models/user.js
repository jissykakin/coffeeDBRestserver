const { Schema, model } = require('mongoose');

const UserSchema = Schema({ 
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    email: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La Contraseña es obligatorio']
    },
    img: {
        type: String
    },
    role: {
        type: String,
        required: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE'],
        default: 'USER_ROLE'
    },
    state: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});



UserSchema.methods.toJSON = function () {    
    const { __v, password, _id, ...userObject} = this.toObject();
    userObject.uid = _id;
    return userObject;
}
/*
UserSchema.set('toJSON', {
    virtuals: true, // Incluye campos virtuales
    transform: (doc, ret) => {
      delete ret.__v;
      delete ret.password;
      ret.uid = ret._id;
      delete ret._id;
      return ret;
    }
  });

  */

module.exports = model('User', UserSchema);