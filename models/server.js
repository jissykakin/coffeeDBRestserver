
const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        //routes
        this.paths = {
            auth:       '/api/auth',
            category:   '/api/category',
            product:    '/api/product',
            search:     '/api/search',
            uploads:    '/api/uploads',
            user:       '/api/user'            
        }
       


        // Conectar a base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();   
           

        // Rutas de mi aplicación
        this.routes();
    }


    async conectarDB(){
        await dbConnection();
    }

    middlewares(){
        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use ( express.json() );

        //directorio publico
        this.app.use( express.static('public'));

        //FileUpload - Carga de archivos
        this.app.use( fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true // crear las carpeta si no existe esto solo se pone si es necesario
        }));
    }

    routes(){

        this.app.use(this.paths.auth , require('../routes/auth'));
        this.app.use(this.paths.category , require('../routes/category'));
        this.app.use(this.paths.product , require('../routes/product'));
        this.app.use(this.paths.search , require('../routes/search'));
        this.app.use(this.paths.uploads , require('../routes/uploads'));
        this.app.use(this.paths.user , require('../routes/user'));
        
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en  puerto', this.port);
        })
    }
}

module.exports = Server;