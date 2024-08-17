const { createFaq, getFaq, getSingleFaq } = require("../controller/faq");

const router = require("express").Router();


// add Faq
router.post('/',createFaq)
// get all Faq
router.get('/',getFaq)
router.get('/:id',getSingleFaq)





module.exports =router