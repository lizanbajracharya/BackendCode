const mongoose=require('mongoose');
const BookSchema = new mongoose.Schema({
    BookName:{
        type:String,
        required:true,
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
    isFavorite:{
        type:String
    },
    BookContent:{
        type:String
    }
});

module.exports = mongoose.model('Book',BookSchema);
