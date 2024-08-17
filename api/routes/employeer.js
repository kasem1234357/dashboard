const { removeEmployeer, updateEmployeer, getEmployeer, getAllEmployeer } = require("../controller/employeer");
const {restrict} =require('../meddlewares')
const router = require("express").Router();
router.get('/all',restrict('super_admin'),getAllEmployeer)
router.get('/:id',getEmployeer)
router.put('/:id',updateEmployeer)
router.delete('/:id',restrict('super_admin'),removeEmployeer)


module.exports = router;