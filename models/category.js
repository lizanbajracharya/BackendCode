const mongoose=require('mongoose')
const CategorySchema=new mongoose.Schema({
    categoryimage:{
        type:String
    },
    categoryname:{
        type:String
    }
})

module.exports = mongoose.model('Category',CategorySchema)
