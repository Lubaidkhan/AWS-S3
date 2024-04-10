const ProductModel = require('../models/Product')
const asyncWrapper = require('../Middlwares/async')
const { createCustomError } = require('../errors/custom-error')
const mongoose = require('mongoose');
const multer = require('multer')
const Aws = require('aws-sdk')
require('dotenv').config()


const productController = {};

productController.checkBody = (req, res, next) => {

    if (!req.body.name || !req.body.price)

        return res.status(404).json({
            message: "Body is not a valid", status: 404
        });
    next();


}

productController.checkId = (req, res, next, val) => {

    console.log("insidecheckid",req.params.id)

    // _id = req.params.id

    // if (!_id){

    // return res.status(404).json({status:'fail',
    //     message:`No record with this ${_id}`})
    // }


    next();

}

productController.addProducts = asyncWrapper(async (req, res, next) => {


    // creating the storage variable to upload the file and providing the destination folder, 
    // if nothing is provided in the callback it will get uploaded in main directory

    // console.log(req.file)  // to check the data in the console that is being uploaded

    // Definning the params variable to uplaod the photo

    // console.log({
    //     accessKeyId: process.env.AWS_ACCESS_KEY_ID,              // accessKeyId that is stored in .env file
    //     secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET      // secretAccessKey is also store in .env file
    // })

    // Now creating the S3 instance which will be used in uploading photo to s3 bucket.
    const s3 = new Aws.S3({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,              // accessKeyId that is stored in .env file
        secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET      // secretAccessKey is also store in .env file
    })

    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,      // bucket that we made earlier
        Key: req.file.originalname,               // Name of the image
        Body: req.file.buffer,                    // Body which will contain the image in buffer format
        ACL: "public-read-write",                 // defining the permissions to get the public link
        ContentType: "image/jpeg"                 // Necessary to define the image content-type to view the photo in the browser with the link
    };
    console.log(req.file)
    // console.log(req.body)
    const obj = JSON.parse(JSON.stringify(req.body));
    console.log(obj)
    s3.upload({
        params,
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: Date.now().toString(),
        Body: req.file.buffer,
    }, (err, s3result) => {
        console.log(s3result)

        if (err) {
            console.log(err)

            res.sendStatus(500).json({ message: err.message })

        } else {
            const product = new ProductModel({
                name: obj.name,
                price: obj.price,
                productImage: s3result.Location
            });

            console.log(product)
            product.save()
                .then(result => {
                    res.sendStatus(200).json({
                        _id: result._id,
                        name: result.name,
                        price: result.price,
                        productImage: s3result.Location,
                    })
                })
                .catch(err => {
                    // console.log("inside catch",err)

                    // console.log(err)
                    res.send({ message: err })
                })
        }
    })

})


productController.listProducts = asyncWrapper(async (req, res) => {

    // console.log("hello")
    const products = await ProductModel.find({ is_deleted: false })

    console.log(products)
    res.send(products)
    res.status(200).json({ products })
}


)
productController.getProduct = asyncWrapper(async (req, res, next) => {
    const filter = { is_deleted: false, _id: mongoose.Types.ObjectId(req.params.id) }

    const product = await ProductModel.findOne(filter);


    if (!product) {
        next(createCustomError(`No product found for this ${filter._id}`, 404));
        return;
    }

    res.status(200).send(product);
});


productController.updateProduct = asyncWrapper(async (req, res, next) => {

    const filter = { _id: mongoose.Types.ObjectId(req.params.id), is_deleted: false };
    const update = req.body;
    update.updated_at = new Date();
    const product = await ProductModel.findOneAndUpdate(filter, update, {
        new: true
    });

    if (!product) {
        next(createCustomError(`No product found for update id ${filter._id}`, 404));
        return;
    }
    res.status(200).send(`update Successfully " ${JSON.stringify(product)}`);

});

productController.deleteProduct = asyncWrapper(async (req, res, next) => {
    const filter = { _id: mongoose.Types.ObjectId(req.params.id) };
    const update = { is_deleted: true };
    update.updated_at = new Date();
    const product = await ProductModel.findOneAndUpdate(filter, update, {
        new: true
    });
    // console.log(product);
    if (!product) {
        next(createCustomError(`Can not delete product with id ${filter._id}`), 404);
        return;
    }
    res.status(200).send(`Deleted Successfully " ${JSON.stringify(product)}`);

});


module.exports = productController;


