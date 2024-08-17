const router = require("express").Router();
const {isAuth} = require('../meddlewares')




const { updateUser, getAllUser, getUser, deleteUser } = require("../controller/users");
const { getAllMovies } = require("../controller/test");


router.put('/:id',isAuth,updateUser)
router.get('/all',getAllUser)
router.get('/',isAuth,getUser)
router.delete('/:id',isAuth,deleteUser);
router.get('/test',getAllMovies)



/*
router:{
    put,
    get,
    delete,
    
}


*/



module.exports =router