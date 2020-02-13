const mongoose=require('mongoose');
const BookSchema = new mongoose.Schema({
    BookName:{
        type:String,
        min:3,
        trim:true
    },
    Category:{
        type:String
    },
    BookWriter:{
        type:String
    },
    BookContent:{
        type:String
    },
    Date:{
        type:Date,
        default:Date.now("MM-DD-YYYY")
    }
});
BookSchema.path('BookName').index({text: true});
module.exports = mongoose.model('Book',BookSchema);
