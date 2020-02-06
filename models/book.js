const mongoose=require('mongoose');
const BookSchema = new mongoose.Schema({
    BookName:{
        type:String,
        min:3,
        trim:true
    },
    BookImage:{
        type:String
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
        type:Date
    }
});

module.exports = mongoose.model('Book',BookSchema);
