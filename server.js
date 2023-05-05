var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// using dotenv
require('dotenv').config()
// app lsitening port
app.listen(process.env.APP_PORT, () => console.log(`server corriendo en puerto ${process.env.APP_PORT}`))

// routes
app.use('/', indexRouter)

// ****************************************************************************************
// DB connection
const mongoose = require('mongoose')
mongoose
    .set('strictQuery', false) // only the fields that are specified in my Schema will be saved in the database
    .connect(`mongodb://${process.env.MONGO_HOST_PORT}/${process.env.MONGO_DB}`)
    .then(() => console.log(`CONECTADO A BBDD ${process.env.MONGO_DB}`))
    .catch(error => console.error(error));

//CORS
const cors = require('cors')
app.use(cors())

let dbs = require('./Models/Bootcamp.model')

// ****************************************************************************************
//                    USERS
// ****************************************************************************************
// get all
  app.get('/api/allUsers', (req, res) => {
    dbs.Users
        .find()
        .then(allUsers => {
          return res.status(200).json({
            count: allUsers.length,
            url: "http://localhost:3001/api/allUsers",
            users: allUsers
          })
      })
  })

//get by id
app.get('/api/user/:user_id', async(req, res) => {
    const {user_id} = req.params
    await dbs.Users
        .findById(user_id)
        .then(user => res.status(200).json(user))
})

//get by role
app.get('/api/user/role/:user_role', async(req, res) => {
    const {user_role} = req.params
    await dbs.Users
        .find({role : user_role})
        .then(users => res.status(200).json(users))
})

// update one user's role
app.put('/api/update/:user_id/:user_role', async(req, res) => {
  const {user_id} = req.params
  const {user_role} = req.params 

  dbs.Users.exists({_id:user_id}, async function (err, doc) {
    if (err){
        //console.log(err)
        const name= "user_" + Math.floor(Math.random() * 100)
        const email= name + "@upc.com"
        const password= "secret"
        const role = "normal"
        const newUser = new dbs.Users({name, email, password, role});
        await newUser.save();
        res.status(201).json({'status 201 User created': {name,email,password,role}})
        //res.send(err)
    } else{
        //res.send(doc)
        await dbs.Users
        .findByIdAndUpdate({_id: user_id}, {role: user_role}, {new: true})
        .then(response =>  res.status(200).json(response))
        .catch( error => console.log(error)) 

        }
    });
});

// delete one user
app.delete('/api/user/delete/:user_id', async(req, res) => {
    const {user_id} = req.params
  
    dbs.Users.exists({_id:user_id}, async function (err, doc) {
      if (err){
          //console.log(err)
          res.status(204).send({status: '204 No Content'})
          //res.send(err)
      } else{
          //res.send(doc)
          await dbs.Users.findByIdAndRemove(user_id);
          res.status(200).json({status: `Elemento con id:${user_id} eliminado`})
          }
      });
  })

// get Create User *
app.post('/api/createUser/', async (req, res) => {
      const {name, email, password, role} = req.body;
      const newUser = new dbs.Users({name, email, password, role});
      await newUser.save();
      res.status(200).json({'user': req.body});

})
