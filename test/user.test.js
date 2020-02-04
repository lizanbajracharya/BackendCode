// use the path of your model
const Product = require('../models/product');
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

describe('Product Add', () => {
// the code below is for insert testing
    // it('Add product testing', () => {
    //     const product = {
    //         'productName': 'Nokia',
    //         'price': '21',
    //         'Stock':'1',
    //         'productDescription':'asd',
    //         'Writer':'ad',
    //         'productImage':'asd.jpg'
    //     };
        
    //     return Product.create(product)
    //         .then((pro_ret) => {
    //             expect(pro_ret.productName).toEqual('Nokia');
    //         });
    // });
// the code below is for delete testing
//     it('to test the delete product is working or not', async () => {
//         const status = await Product.deleteMany();
//         expect(status.ok).toBe(1);
// });






it('to test the update', async () => {

    return Product.findOneAndUpdate({_id :Object('5e3927556b317f40bcadf634')}, {$set : {productName:'ram'}})
    .then((pp)=>{
        expect(pp.productName).toEqual('ram')
    })
  
});

    
})
