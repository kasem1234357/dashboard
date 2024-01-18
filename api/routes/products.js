const router = require("express").Router();
const { getProducts } = require("../controller/client");
const Product = require("../models/Product");
const dotenv = require("dotenv");
const { isAuth } = require("./authMiddleware");
const cloudinary = require("cloudinary").v2;
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUNDERY_API_KEY,
  api_secret: process.env.CLOUNDERY_API_SECRET,
});
// const cloudinaryImageUploadMethod = file => {
//   let url =""
//   cloudinary.uploader.upload(file, { width: 500, crop: 'scale' }, function(error, result) {
//     if (error) {
//       console.error(error);
//     } else {
//       url =result.secure_url;
//     }
//   });
//   return url
// }
const cloudinaryUpload = async (file) => {
  console.log(file);
  return cloudinary.uploader.upload(
    file,
    { timeout: 60000,
    quality_analysis:true },
    function (error, result) {
      if (error) {
        console.error(error);
        throw Error("Error");
      } else {
        return result.secure_url;
      }
    }
  );
};
router.post("/images", async (req, res) => {
  const { imgData, type, index } = req.body;
  try {
    let imgUrl = await cloudinaryUpload(imgData);
    res.status(200).json({
      type,
      index,
      url: imgUrl,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});
// const upload = async (req, res, next) => {
//   try {
//     const { profileImg, otherImg, ...others } = req.body;

//     let profileImgUrl = await cloudinaryUpload(profileImg);
//     let otherImgUrls = [];

//     for (let i = 0; i < otherImg.length; i++) {
//       let url = await cloudinaryUpload(otherImg[i].url);
//       otherImgUrls.push({ id: otherImg[i].id, url:url.secure_url });
//     }
//     req.body.profileImg = profileImgUrl.secure_url
//       req.body.otherImg= otherImgUrls

//     next();
//   } catch (error) {
//     console.log(error);
//     next(error);
//   }
// };
// add product
router.post("/", async (req, res) => {
  const newProduct = new Product(req.body);
  console.log("the line is 33", newProduct);
  //
  try {
    const savedProduct = await newProduct.save();
    console.log(savedProduct);
    res.status(200).json("savedProduct");
  } catch (error) {
    res.status(500).json({ massege: error });
  }
});
// update product
router.put("/update/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    await product.updateOne({ $set: req.body });
    res.status(200).json("the product has been updated");
  } catch (error) {
    res.status(500).json(error);
  }
});
// get product
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
});
//get all products
//====================================================//
/*
router.get('/',async(req,res)=>{
 try {
   const allProducts = await Product.find()
   res.status(200).json(allProducts)
 } catch (error) {
  res.status(500).json(error)
 }
})
*/
//==================================================//
router.get("/", getProducts);
//delete products
router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    await product.deleteOne();
    res.status(200).json("the product has been deleted ");
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
