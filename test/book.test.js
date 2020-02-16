// use the path of your model
const Book = require('../models/book');
const mongoose = require('mongoose');
// use the new name of the database
const url = 'mongodb://localhost:27017/testDatabase'; 
beforeAll(async () => {
    await mongoose.connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true
    });
});

afterAll(async () => {

    await mongoose.connection.close();
});

describe('Book Add', () => {
// the code below is for insert testing
    // it('Add product testing', () => {
    //     const book = {
    //         'BookName': 'Nokia',
    //         'BookWriter': 'asdasd',
    //         'Category':'ad',
    //         'BookContent':'asd.pdf'
    //     };
        
    //     return Book.create(book)
    //         .then((pro_ret) => {
    //             expect(pro_ret.BookName).toEqual('Nokia');
    //         });
    // });

    it('to test the update', async () => {
        return Book.findOneAndUpdate({_id :Object('5e48ef6bb706075b0c87f7c1')}, {$set : {BookName:'Nokia'}})
        .then((pp)=>{
            expect(pp.BookName).toEqual('ram')
        })
      
    });

// the code below is for delete testing
//     it('to test the delete book is working or not', async () => {
//         const status = await Book.deleteMany();
//         expect(status.ok).toBe(1);
// });
    
})
