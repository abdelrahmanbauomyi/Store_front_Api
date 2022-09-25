import client from "../database";
 export type product={
    name :string,
    price :number,
    category:string
 }
 export class product_Options{
    async index() :Promise<product[]>{
        try{
            const conn = await client.connect();
            const sql = 'SELECT * FROM product';
            const resault = await conn.query(sql);
            conn.release();
            return resault.rows;
        }   
        catch(error){
            throw new Error (`Couldn't get users :${error}`)
        }
    }
    async show (id :string) :Promise<product>{
        try{
            const conn = await client.connect();
            const sql = `SELECT * FROM product WHERE id=${parseInt(id)}`
            const resault = await conn.query(sql);
            conn.release();
            return resault.rows[0];
        }   
        catch(error){
            throw new Error (`Couldn't get product with id ${id} :${error}`)
        }
    }
    async create (P :product):Promise<product>{
        try{
            const conn = await client.connect();
            const sql =   `INSERT INTO product (name, price, category) VALUES('${P.name}',${P.price},'${P.category}') RETURNING *`  
            const resault = await conn.query(sql);
            conn.release();
            return resault.rows[0];
        }   
        catch(error){
            throw new Error (`Couldn't add product :${error}`)
        }
    }
    async index_By_Category (category :string) :Promise<product[]>{
        try{
        const conn =await client.connect();
        const sql = `SELECT * FROM product WHERE category ='${category}'`
        const resault = await conn.query(sql);
        conn.release();
        return resault.rows;
        }
        catch(error){
            throw new Error (`Couldn't get products with category ${category} :${error}`)
        }
    }  
 }