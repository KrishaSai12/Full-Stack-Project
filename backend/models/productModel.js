const { default: mongoose } = require("mongoose");

const ProductSchema = new mongoose.Schema({
    name : {
        type : String,
        required:[true,"please enter product name "],
        trim:true,
        maxLength:[100, "product name exists the limit 100 character "] //buit in validators
    },
    price :{
        type : Number,
        default : 0.0
    },
    description :{
        type : String,
        required :[true, "please enter the product Details"]
    },
    ratings :{
        type :Number ,
        default :0
    },
    images :[
        {
            image :{
                type : String,
                required : true
            }
        }
    ],
    category :{
        type : String,
        required : [true,"Please enter Product Category"],
        enum : { //we can specify some values only that values should be in data
            values :[
                'Phone ',
                'Laptops',
                'Watch',
                'EarPhones',
                'accessories'
            ],
            message : " Please select the correct category "
        }
    },
    stock :{
        type : Number,
        required :[true ,"Please enter  the product stock"],
        maxlength:[30,"Product Stock not exceed 30"]
    
    },
    numberOfReviews:{
        type :Number,
        default :0
    },
    reviews :[
        {
            user : {
                type:mongoose.Schema.Types.ObjectId,
                ref:'user'
            },
            rating :{
                type :Number,
                default :0.0
            },
            comment:{
                type :String,
                required: true
            }
            
        }

    ],
    user :{
        type:mongoose.Schema.Types.ObjectId // this is kept why because of which user creates the product should get displayed

    },
    createdAt:{
        type:Date,
        default:Date.now()

    },
    expiryAt :{
        type:Date,
        default : Date.now()
    },
    
})

 // will create the model based on the schema using method called model and the model has the name Product 

let schema = mongoose.model('Product',ProductSchema);
module.exports = schema;