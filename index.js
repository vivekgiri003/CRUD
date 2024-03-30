import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import Product from './models/product.js'
import MethodOverride from 'method-override';

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/FarmStand')
    .then(() => {
        console.log("mongo connection open!!")
    })
    .catch(err => {
        console.log("mongo errror")
    })

const app = express();

import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

app.set("views", path.join(__dirname, "/views"));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }))
app.use(MethodOverride('_method'))

const categories = ['fruit', 'vegetable', 'dairy'];

app.get('/products', async (req, res) => {
    const { category } = req.query;
    if (category) {
        const products = await Product.find({ category })
        res.render('products/index', { products, category });
    }
    else {
        const products = await Product.find({})
        // console.log(products);
        res.render('products/index', { products, category: "All" });
    }

})
app.get('/products/new', (req, res) => {
    res.render('products/new', { categories });
})
app.post('/products', async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    console.log(newProduct);
    res.redirect(`/products/${newProduct._id}`);
})
app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id)
    // console.log(product);
    res.render('products/show', { product });
})
app.get('/products/:id/edit', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id)
    res.render("products/edit", { product, categories })

})

app.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true })
    // console.log(req.body);
    res.redirect(`/products/${product._id}`);
})
app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.redirect("/products");
})
app.listen(3000, () => {
    console.log("port is listening")
})