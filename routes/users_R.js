const express = require('express');
const router = express.Router();
const {getAllUsers,getOneUser,deleteUser,updateUser} = require('../controller/users_C.js');
const {isValidId,valuesToEdit} = require('../middelware/users_MID');
const {isLoggedIn} = require('../middelware/auth_MID');

router.get('/',isLoggedIn,getAllUsers);
router.get('/:id',isLoggedIn,isValidId,getOneUser);
router.delete('/:id',isLoggedIn,isValidId,deleteUser);
router.patch('/:id',isLoggedIn,isValidId,valuesToEdit,updateUser);

module.exports = router;