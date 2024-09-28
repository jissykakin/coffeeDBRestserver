const mongoose = require('mongoose');


const dbConnection = async () => {

    try {

        await mongoose.connect(process.env.MONGODB_CNN);
/*
       await mongoose.connect(process.env.MONGODB_CNN, {
        userNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
       });*/

        console.log('Base de Datos Online');
        
        
    } catch (error) {
        console.log(error);
        throw new('Error a la hora de iniciar la DB')
    }
}

module.exports = {
    dbConnection
}