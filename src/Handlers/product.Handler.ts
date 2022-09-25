import express,{ Request,Response } from "express";
import { product,product_Options } from "../Models/product.Model";
import verifiy_Token from "./Auth.middelware";

const Options = new product_Options()

const index =async (req:Request,res:Response) => {
    const listOfProducts = await Options.index()
    res.json(listOfProducts);
}

const show =async (req:Request,res:Response) => {
    const id = req.body.id;
    const requested_Product = await Options.show(id)
    res.json(requested_Product)
}
const create =async (req:Request,res:Response) => {
    try{
        const Product : product = {
            name :req.body.name,
            price :req.body.price,
            category: req.body.category
        }
        const newProduct = await Options.create(Product)
        res.json(newProduct)
    }
    catch(err){
        res.status(400)
        res.json(err)
    }
}
const search_by_category = async (req:Request,res:Response)=>{
    const category = req.body.category
    const Products_By_Category = await Options.index_By_Category(category);
    res.json(Products_By_Category);
}

const productRoutes =(app:express.Application)=>{
    app.get('/Products',index)
    app.get('/Products/id',show)
    app.post('/Products',verifiy_Token,create)
    app.get('/Products/category',search_by_category)
}
export default productRoutes;