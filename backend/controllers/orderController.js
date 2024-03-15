const catchAsyncError = require('../middlewars/catchAsyncError');
const Order = require('../models/orderModel');
const ErrorHandler = require('../utills/errorHandler');
const Product = require('../models/productModel');

// creating the New order

exports.neworder = catchAsyncError(async (req,res,next)=>{
    const {orderItems,shippingInfo,itemsPrice,taxPrice,shippingPrice,totalPrice}= req.body; // taking these fields from the request body
    // creating these fields
    const order = await Order.create({
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt : Date.now(),
        user :req.user.id     // taking the user id from the request  
    })
    res.status(200).json({
        success:true,
        order
    })
    
})

// Getting the single order - api/v1/order/:id
exports.getSingleOrder = catchAsyncError(async (req,res,next)=>{
    const  order =  await Order.findById(req.params.id).populate('user','name email') // we want to know the which user has made the order so we use populate method to take the user details in which order schema has the user id
    if(!order){
        return next(new ErrorHandler(`Order was not found with this ID ${req.params.id}`,401));
    }
    res.status(200).json({
        success:true,
        order
    })

})

// Get LoggedIn user orders to show all the orders made by the user 
exports.myOrders = catchAsyncError(async (req,res,next)=>{
   const orders =  await Order.find({user: req.user.id}); // getting the data from the user dataset by using user id
   res.status(200).json({
    success:true,
    orders
   })
})

// Admin based handler functions : Get all the orders - api/v1/orders
exports.orders = catchAsyncError(async (req,res,next)=>{
     const orders =  await Order.find();
     let totalAmount = 0;
     orders.forEach((order)=>{
        totalAmount+= order.totalPrice; // taking totalAmount for the order
     })
     res.status(200).json({
        success:true,
        totalAmount,
        orders
     })
})

// Update order : Admin based handler functions and also changing the stock if order was placed - api/v1/order/:id
exports.updateOrder = catchAsyncError(async (req,res,next)=>{
    const order = await Order.findById(req.params.id);
    if(!order){
        return next(new ErrorHandler(`Order was not found with this given Id ${req.params.id}`,401));
    }
    if(order.orderStatus == 'Delivered'){
        return next(new ErrorHandler(`Order has been already Delivered`,400));
    }
    // updating the product stock of each order item 
    order.orderItems.forEach( async(orderItem)=>{
        await updateStock(orderItem.product ,orderItem.quantity);

    })
    order.orderStatus = req.body.orderStatus;
    order.deliveryAt = Date.now();
    await order.save();

    res.status(200).json({
        success :true
    })

})
// taking the product from the product id from that taking the stock and reducing stock while the order was placed
async function updateStock (productId , quantity){
    const product = await Product.findById(productId);
    product.stock = product.stock - quantity;
    product.save({validateBeforeSave : false});
}

// Admin based handler function  : api/v1/order/:id
exports.deleteOrder  = catchAsyncError(async (req,res,next)=>{
    const order = await Order.findByIdAndRemove(req.params.id);
    if(!order){
        return next( new ErrorHandler(`Order was not found with this Id ${req.params.id}`,401));
    }
   
    res.status(200).json({
        success :true
    })
})