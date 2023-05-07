# Bootcamp del Master en Full Stack Web Development de ThreePoints

El siguiente repositorio es una breve guía explicar el consumo de la API realizada como requisito del taller expuesto en este módulo del Master.
Se pretende tener una base de nodejs y docker de acuerdo al temario impartido en el Bootcamp del Master en Full Stack Web Development de Three Points.

## Descripción de contenidos

* Models: directorio que contiene la conexión a la base de datos de MongoDb y su configuración.
* controllers: directorio con las acciones que lleva a cabo la API.
* mongo_seed: directorio con la configuración de Docker para crear la imagen de mongo y popular la db con registros provenientes 
  del archivo users.json.
* routes: directorio que contiene las rutas para poder consumir la API.
* views: directorio con una ruta default al iniciar el proyecto.
* .env: archivo con las variables de entorno de la APP - para fines educativos se carga en github, **pero esta es una mala práctica**

## Dockerización Base de Datos MongoDB

Dado que en la actividad se pide que la app, desplegada en un Docker se comunique con la base de datos, también desplegada en un Docker container tenemos:

* Se crea el archivo **Dockerfile** a nivel del proyecto para crear la imágen de node - nuestro proyecto
* Se crea el archivo **Dockerfile** en /mongo_seed para crear la imágen de mongo y popular la db.
* Se crea el archivo **docker-compose.yml** para definir los servicios:
    - **express** : servicios de node
    - **mongo_db** : servicios DB
    - **seed-seed** : servicios para popular la DB creada
    
    **Todos los servicios presentan la creación de volúmenes en docker para tener persistencia de datos a nivel de app y db.**

Para crear las imágenes, correr la aplicación y la Db dockerizadas sólo debe ubicarse en la raíz del proyecto y ejecutar:
```bash
npm install

docker-compose up -d - Detached mode: Run containers in the background
ó
docker-compose up - Attached mode: attach to service output
```

Para bajar los servicios y el contenedor, ejecute:
```bash
docker-compose down
```

Luego de correr el proyecto por primera vez, puede comentar las líneas de la 32 a la 41 con un '#' en el **docker-compose.yml**.
Esto con el fin de que la proxima vez que suba los servicios, no vuelva a popular la DB con el archivo users.json
```bash
#mongo-seed:
#    env_file:
#      - .env
#    build:
#        context: ./mongo_seed
#        dockerfile: Dockerfile
#        args:
#          - DATABASE_URI=$DATABASE_URI
#    depends_on:
#        - mongo_db
```

## Consumo de la API

la API consiste en 6 rutas para llevar a cabo acciones de CRUD:

* Para ver todos los usuarios de la DB:
```bash
http://localhost:4000/api/allUsers
```

* Para consultar un usuario por su ID:
```bash
http://localhost:4000/api/user/:user_id
```

* Para consultar un usuario por su Role:
```bash
http://localhost:4000/api/user/role/:user_role
```

* Para actualizar el Role de un usuario:
```bash
http://localhost:4000/api/update/:user_id/:user_role
```

* Para eliminar un usuario:
```bash
http://localhost:4000/api/user/delete/:user_id
```

* Para crear un usuario random:
```bash
http://localhost:4000/api/createUser/
```

## Support:
Email: <luis.carrasquilla.z@gmail.com> / 
Linkedin: **[Luis Carrasquilla](https://www.linkedin.com/in/luis-carrasquilla/)** 


## License
MIT License



