const mongoose=require('mongoose')
const FavoriteSchema=new mongoose.Schema({
    userid:{
        type:String
    },
    bookid:{
        type:String
    }
})

module.exports = mongoose.model('Favorite',FavoriteSchema)
