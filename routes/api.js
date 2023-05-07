const express = require('express');
const router = express.Router();

const {allUsers, userById, userByRole, userUdate, userDelete, userCreate, notMapped} = require('../controllers/api.controller');


// ***********************************************************
//                          USERS                           //
// ***********************************************************

router.get('/allUsers', allUsers);
router.get('/user/:user_id', userById);
router.get('/user/role/:user_role', userByRole);
router.put('/update/:user_id/:user_role',userUdate);
router.delete('/user/delete/:user_id', userDelete);
router.post('/createUser/', userCreate);

router.get('*', notMapped);


module.exports = router;
