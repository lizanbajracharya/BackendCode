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
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    Date:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('Book',BookSchema);
