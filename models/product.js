const mongoose=require('mongoose');
const ProductSchema = new mongoose.Schema({
    productName:{
        type:String,
        required:true,
        min:4,
        trim:true
    },
    Writer:{
        type:String
    },
    price:{
        type: Number,
        // required: true,
        minlength:1,
        trim: true
    },
    productImage:{
        type:String
    },
    productDescription:{
        type:String
    },
    Stock:{
        type:String
    },
    Date:{
        type:Date,
        default:Date.now
    }
});
ProductSchema.path('productName').index({text: true});
module.exports = mongoose.model('Product',ProductSchema);
