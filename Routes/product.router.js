const express = require('express')
const router = express.Router()         
const multer = require('multer');      
const productController = require('../controllers/product.controller');
                  


const { addProducts, updateProduct , listProducts, getProduct, deleteProduct } = require('../controllers/product.controller');

/* GET home page. */
const storage = multer.memoryStorage({
    destination: function (req, file, cb) {
        cb(null, Date.now().toString())
    }
})

// below variable is define to check the type of file which is uploaded

const filefilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

// defining the upload variable for the configuration of photo being uploaded
const upload = multer({ storage: storage, fileFilter: filefilter });

// Param Middlware

// router.param('id',(req,res,next,val)=>{
//     console.log(`product id is ${val}`)

//     next();
// })

router.param('id',productController.checkId)

// now how to handle the post request and to upload photo (upload photo using the key defined below in upload.single ie: productimage )
router.route('/').post(upload.single('productimage'),productController.checkBody,addProducts)

router.route('/').get(listProducts);
router.route('/:id').put(updateProduct)
.get(getProduct)
.delete(deleteProduct);

module.exports = router;


module.exports = router