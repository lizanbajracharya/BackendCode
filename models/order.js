const mongoose=require('mongoose')
const OrderSchema=new mongoose.Schema({
    Productid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product'
    },
    Userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
})

module.exports=mongoose.model('Order',OrderSchema)