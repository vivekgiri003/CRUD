import mongoose from "mongoose";
import Product from "./models/product.js";

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/FarmStand')
    .then(() => {
        console.log("connection open!!")
    })
    .catch(err => {
        console.log("errror")
    })

// const p = new Product({
//     name: 'Apple',
//     price: 100.00,
//     category: 'fruit'
// }) 
// p.save()
// .then(p =>{
//     console.log(p);
// })
// .catch(e =>{
//     console.log(e);
// })

const seedProducts = [
    {
        name: 'Fairy Eggplant',
        price: 1,
        category: 'vegetable'
    },
    {
        name: 'Organic Goddess Melon',
        price: 4.99,
        category: 'fruit'
    },
    {
        name: 'Organic Mini Seedless Watermelon',
        price: 3.99,
        category: 'fruit'
    },
    {
        name: 'Organic Celery',
        price: 1.50,
        category: 'vegetable'
    },
    {
        name: 'Chocolate Whole Milk',
        price: 2.69,
        category: 'dairy'
    }
]

Product.insertMany(seedProducts)
    .then(res => {
        console.log(res);
    })
    .catch(e => {
        console.log(e);
    })