"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_Model_1 = require("../Models/product.Model");
const Auth_middelware_1 = __importDefault(require("./Auth.middelware"));
const Options = new product_Model_1.product_Options();
const index = async (req, res) => {
    const listOfProducts = await Options.index();
    res.json(listOfProducts);
};
const show = async (req, res) => {
    const id = req.body.id;
    const requested_Product = await Options.show(id);
    res.json(requested_Product);
};
const create = async (req, res) => {
    try {
        const Product = {
            name: req.body.name,
            price: req.body.price,
            category: req.body.category
        };
        const newProduct = await Options.create(Product);
        res.json(newProduct);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const search_by_category = async (req, res) => {
    const category = req.body.category;
    const Products_By_Category = await Options.index_By_Category(category);
    res.json(Products_By_Category);
};
const productRoutes = (app) => {
    app.get('/Products', index);
    app.get('/Products/id', show);
    app.post('/Products', Auth_middelware_1.default, create);
    app.get('/Products/category', search_by_category);
};
exports.default = productRoutes;
