const mongoose=require('mongoose')
const OrderSchema=new mongoose.Schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    productname:{
        type:String
    },
    rate:{
        type:String
    },
    location:{
        type:String
    },
    mobilenumber:{
        type:String
    }
})

module.exports=mongoose.model('Order',OrderSchema)