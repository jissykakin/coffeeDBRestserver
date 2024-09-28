# WebServer + RestServer

Rest Server con Node.Js, sencilla API que permite realizar el CRUD de los modelos de datos Productos, Usuarios, Categorias, tambien permite la carga y visualizacion de imagenes tanto en local files como en Cloudinary

recuerden que deben de ejecutar ``` npm install ``` para reconstruir los módulos de Node.


## Development server

1. Clona el Repositorio:
```ts

  git clone https://github.com/jissykakin/coffeeDBRestserver.git

```

2.Install the npm package.
```
  cd restServer

  npm install

```


3. Crea el archivo ```.env``` con las variables de entorno indicadas en el archivo ``` .env copy ``` 
```
PORT=
MONGODB_CNN = 
SECRETORPRIVETEKEY=

GOOGLE_CLIENT_ID =
GOOGLE_SECRET_ID =

CLOUDINARY_URL=

```

4. Crea la Base de datos en Mongo compass o mongo atlas y configura la varable MONGODB_CNN

5. Configura Google [SignIn](https://accounts.google.com/login?hl=en_GB) y [Coudinary](https://cloudinary.com/documentation/image_upload_api_reference) para poder utilizar sus servicios y configura las variables de entorno.

6. Run, for a dev server. 

```ts
  ng serve ó npm start
```

Navigate to `http://localhost:8080/`. The application will automatically reload if you change any of the source files.


## Documentation API

### Petición POST - Crear Usuario
http://localhost:8080/api/user


Body | raw (json)

```ts
{
    "name": "Carlos ",
    "password": "123456",
    "email": "test6@test.com",
    "role": "USER_ROLE"
}

```

### Petición PUT - Update Usuario 
``` http://localhost:8080/api/user/66bc499553328c0a64b8570d ```

Body | raw (json)

```ts
{
    "name": "Jissy ",
    "google": "true",
    "password": "123456",   
    "role": "ADMIN_ROLE",
    "state": "true"
}
```

### Petición GET - Get Usuario

```http://localhost:8080/api/user/?limit=5&desde=0```

Query Params

 | Key          | Value                    |
   |----------------|----------------------|
   | _limit_ | 5  |
   | _desde_ | 0  |


## Petición DELETE - Delete Usuario
``` http://localhost:8080/api/user/66bc499553328c0a64b8570d ```

Request Headers

 | Key            | Value                        |
   |----------------|----------------------|
   | x-token   | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2NmJiMDMzN2ExMTYxMjg1YTQ0M2Y0YmQiLCJpYXQiOjE3MjM4MDM2NjMsImV4cCI6MTcyMzgxODA2M30.pnEdl2Z3eaSA7Q-LLrdmPSYqlNzQTeGbmVls1U0uF10  |
 

### Authentication Login Usuario   - Petición POST
``` http://localhost:8080/api/auth/login ```

Body | raw (json)
```ts
{
    "password": "123456",
    "email": "test1@gmail.com"        
}
```

### Authentication - Google SignIn - Petición POST 

``` http://localhost:8080/api/auth/google ```

Body | raw (json)
```ts 
{
    "id_token": "Carlos Merlano"
}
```

### Petición GET - Validar o renovar Token - CafeDB

Request Headers

 | Key            | Value                        |
   |----------------|----------------------|
   | x-token   | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2NmJiMDMzN2ExMTYxMjg1YTQ0M2Y0YmQiLCJpYXQiOjE3MjM4MDM2NjMsImV4cCI6MTcyMzgxODA2M30.pnEdl2Z3eaSA7Q-LLrdmPSYqlNzQTeGbmVls1U0uF10  |
 

 ### Petición GET - Obtener Categorias by ID
 ``` http://localhost:8080/api/category/66c2e27acf36b288310b4c5e ```

 Query Params

 | Key          | Value                    |
   |----------------|----------------------|
   | _limit_ | 5  |
   | _desde_ | 0  |


> [!NOTE]
> Tambien puedes ir al enlace de documentacion de la API CafeDB en donde encontrarás las demas peticiones para los modelos productos, categorias y la carga y visualizacion de imagens o archivos adjuntos [Documentacion Postman APPCoffeeDB](https://documenter.getpostman.com/view/31258840/2sAXqy4fNY).


## Tecnologías utilizadas:

- ![Static Badge](https://img.shields.io/badge/Node%23js-%235FA04E?style=flat-square&logo=nodedotjs&labelColor=black)&nbsp;
- ![Static Badge](https://img.shields.io/badge/MongoDB-%2347A248?style=flat-square&logo=mongodb&labelColor=black)&nbsp;
- ![Static Badge](https://img.shields.io/badge/Boostrap-%237952B3?style=flat-square&logo=Bootstrap&labelColor=black)&nbsp;
- ![Static Badge](https://img.shields.io/badge/HTML5-%23E34F26?style=flat-square&logo=html5&labelColor=black)&nbsp;
- ![Static Badge](https://img.shields.io/badge/CSS3-%231572B6?style=flat-square&logo=css3&labelColor=black)&nbsp;
- ![Static Badge](https://img.shields.io/badge/JavaScript-yellow?style=flat-square&logo=JavaScript&labelColor=black)&nbsp;
- ![Visual Studio Code](https://img.shields.io/badge/-Visual%20Studio%20Code-05122A?style=flat&logo=visual-studio-code&logoColor=007ACC)&nbsp;