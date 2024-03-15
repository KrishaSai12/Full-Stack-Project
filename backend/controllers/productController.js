const Product = require('../models/productModel'); // imported from model 
const ErrorHandler = require('../utills/errorHandler');
const catchAsyncError = require('../middlewars/catchAsyncError');
const APIFeatures = require('../utills/apiFeature');

// Get Products - using url /api/v1/products

exports.getProducts = catchAsyncError(async (req, res, next) => { // route handler function which perform some operations for the coressponding route
    const resPerPage = 3; // this variable is used declare how many results per page and giving argument to paginate function 
    // creates a object  

    let buildQuery = () => {
        return new APIFeatures(Product.find(), req.query).search().filter()

    }
    const filteredProductsCount = await buildQuery().query.countDocuments({});
    const totalProductsCount = await Product.countDocuments({});
    let productsCount = totalProductsCount;
    if (filteredProductsCount !== totalProductsCount) {
        productsCount = filteredProductsCount
    }


    const products = await buildQuery().paginate(resPerPage).query;

    await new Promise(resolve => setTimeout(resolve, 3000)) //displaying the loading spinner 
    res.status(200).json({
        success: true,
        countOfProducts: productsCount,
        resPerPage,
        products
    })
})
//create  the product based on the model schema using url /api/v1/products/new

exports.newProduct = catchAsyncError(async (req, res, next) => {
    req.body.user = req.user.id // the req.user.id has id value that value is set to the req has the user fields
    let images = []
    if (req.files.length > 0) {
        req.files.forEach((file) => {
            let url = `${process.env.BACKEND_URL}/uploads/product/${file.originalname}`;
            images.push({ image: url })
        })
    }

    req.body.images = images;

    const product = await Product.create(req.body); //which creates a document in a database by the create method
    res.status(201).json({
        success: true,
        product
    })
})


//Get single Product

exports.getSingleProduct = catchAsyncError(async (req, res, next) => {
    let product = await Product.findById(req.params.id).populate('reviews.user', 'name email');
    if (!product) {

        return next(new ErrorHandler('Product not found for the specified id ', 400));
    }
    res.status(201).json({
        success: true,
        product
    })
})

//update the products 

exports.updateProduct = catchAsyncError(async (req, res, next) => {
   let product = await Product.findById(req.params.id);
   
   if (!product) {
    return res.status(404).json({
        success: failure,
        message: 'There  is no product with the requested Id'
    })


}
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true, // we should get only updated data show we give true
        runValidators: true // to validate the data based on schema

    })

    res.status(200).json({
        success: true,
       product
    })

})

//delete the products 

exports.deleteProduct = catchAsyncError(async (req, res, next) => {
    let deleteProduct = await Product.findByIdAndRemove(req.params.id); //req.params is a object all the route parameter are stored

    if (!deleteProduct) {
        return next(new ErrorHandler(`Product was not found with this ${req.params.id} Id`, 401));
    }
    res.status(200).json({
        success: true,
        message: `The product is deleted ${req.params.id}`
    })



})
// reviews handling functions  - create review
exports.createReview = catchAsyncError(async (req, res, next) => {
    const { productId, rating, comment } = req.body;
    // creating the review object
    const review = {
        user: req.user.id,
        rating,
        comment
    }
    // a user must review a product only once
    const product = await Product.findById(productId);
    const isReviewed = product.reviews.find((review) => {
        return review.user.toString() == req.user.id.toString();

    })
    // finding user already reviewed
    if (isReviewed) {
        //updating the review
        product.reviews.forEach((review) => {
            if (review.user.toString() == req.user.id.toString()) {
                review.comment = comment;
                review.rating = rating;
            }
        })

    } else {
        // creating the review
        product.reviews.push(review);
        product.numberOfReviews = product.reviews.length;
    }
    // find the average of the product reviews
    product.ratings = product.reviews.reduce((acc, review) => { // reduce method is used the whole values of array is changed into single value
        return review.rating + acc;

    }, 0) / product.reviews.length// 0 is the initial value of accumulator

    product.ratings = isNaN(product.ratings) ? 0 : product.ratings;
    await product.save({ validateBeforeSave: false });
    res.status(200).json({
        success: true,
        review
    })

})

// Get Reviews -api/v1/reviews?id={productId}
exports.getReviews = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.id).populate('reviews.user','name email');

    res.status(200).json({
        success: true,
        reviews: product.reviews
    })
})

// Delete review  = api/v1/review
exports.deleteReview = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);
    // filtering the reviews which does not match the delete review id
    const reviews = product.reviews.filter((review) => {
        return review._id.toString() !== req.query.id.toString()
    });
    //updating the number of reviews
    const numberOfReviews = reviews.length;
    // finding the  average with the filterd reviews 

    let ratings = reviews.reduce((acc, review) => { // reduce method is used the whole values of array is changed into single value
        return review.rating + acc;

    }, 0) / reviews.length;
    ratings = isNaN(ratings) ? 0 : ratings;
    // save the product

     await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        numberOfReviews,
        ratings
    });
    res.status(200).json({
        success: true,
        
    })
})


// get full products - admin route

exports.getAdminProducts = catchAsyncError(async (req, res, next) => {
    const products = await Product.find();
    res.status(200).send({
        success: true,
        products
    })
})