const mongoose=require('mongoose')
const FavoriteSchema=new mongoose.Schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    bookid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Book'
    }
})

module.exports = mongoose.model('Favorite',FavoriteSchema)
