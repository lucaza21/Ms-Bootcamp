let dbs = require('../Models/Bootcamp.model')
const  mongoose = require('mongoose');

module.exports = {
    
    //get all users
    allUsers : (req, res) => {
        dbs.Users
            .find()
            .then(allUsers => {
                return res.status(200).json({
                count: allUsers.length,
                url: "http://localhost:4000/api/allUsers",
                users: allUsers
                })
            })
        },
    
    //get by id
    userById: async(req, res) => {
        const {user_id} = req.params

        //console.log(user_id)
        await dbs.Users.findById(user_id)
        .then(user => {
            console.log('el usuario existe')
                //console.log(user)
                res.status(200).send(user) 
            })
         .catch( error => {
            console.log('favor ingrese un ID válido')
            res.status(204).end()
         })
    },
    
    //get by role
    userByRole : async(req, res) => {
        const user_role = req.params.user_role
        await dbs.Users
                .find({role : user_role})
                .then(users => res.status(200).json(users))
                .catch( error => {
                    console.log('el role mencionado no existe')
                    res.status(204).end()
                 })
    },
    
    // update one user's role
    userUpdate:  async(req, res) => {
      const {user_id} = req.params
      const {user_role} = req.params 
    
      await dbs.Users.exists({_id:user_id}, async function (err, doc) {
        if (err){
            const name= "user_" + Math.floor(Math.random() * 100)
            const email= name + "@upc.com"
            const password= "secret"
            const role = user_role
            const newUser = new dbs.Users({name, email, password, role});
            await newUser
                    .save()
                    .then(response => res.status(201).json({'status 201 User created': response}))
                    .catch(error => res.status(401).send(error))
        } else{
            await dbs.Users
                    .findByIdAndUpdate({_id: user_id}, {role: user_role}, {new: true})
                    .then(response =>  res.status(200).json(response))
                    .catch(error => res.status(401).send(error))
    
            }
        });
    },
    
    // delete one user
    userDelete: async(req, res) => {
        const {user_id} = req.params
      
        await dbs.Users.exists({_id:user_id}, async function (err, doc) {
          if (err){
              console.log('el usuario no existe')
              res.status(204).end()
          } else{
              //res.send(doc)
              await dbs.Users.findByIdAndRemove(user_id);
              res.status(200).json({status: `Elemento con id:${user_id} eliminado`})
              }
          });
      },
    
    // extra - Create User *
    userCreate: async (req, res) => {
          const {name, email, password, role} = req.body;
          const newUser = new dbs.Users({name, email, password, role});
          await newUser.save();
          res.status(200).json({'user': req.body});
    
    },

    // not mapped routes
    notMapped : async (req, res) =>{
        res.redirect('/');
    }
    
};