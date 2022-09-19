const router = require("express").Router();
const Product = require('../models/Product')
// add product
router.post('/',async(req,res)=>{
   const newProduct = new Product(req.body)
 try {
   const savedProduct = await newProduct.save()
   res.status(200).json(savedProduct)
 } catch (error) {
   res.status(500).json({massege:error})
 }
})
// update product 
router.put('/update/:id',async(req,res)=>{
   try {
    const product = await Product.findById(req.params.id);
      await product.updateOne({ $set: req.body });
      res.status(200).json("the product has been updated");

   } catch (error) {
     res.status(500).json(error)
   }
})
// get product
router.get('/:id', async(req,res)=>{
 try {
    const product = await Product.findById(req.params.id)
    res.status(200).json(product)
 } catch (error) {
  res.status(500).json(error)
 }
})
//get all products 
router.get('/',async(req,res)=>{
 try {
   const allProducts = await Product.find()
   res.status(200).json(allProducts)
 } catch (error) {
  res.status(500).json(error)
 }
})
//delete products
router.delete('/:id',async(req,res)=>{
 try {
   const product = await Product.findById(req.params.id)
   await product.deleteOne();
   res.status(200).json('the product has been deleted ')
 } catch (error) {
  res.status(500).json(error)
 } 
})






module.exports =router