import client from "../database";
export type order = {
    users_id :number ,
    status_of_order :string
}
export type Trueorder = {
    users_id :number ,
    status_of_order :string,
    id:number
}

export type Order_detail ={
    quantity :number ,order_id :number ,product_id: number
}
export class order_Options {
    async index() :Promise<Trueorder[]>{
        try{
            const conn = await client.connect();
            const sql = 'SELECT * FROM orders';
            const resault = await conn.query(sql);
            conn.release();
            return resault.rows;
        }   
        catch(error){
            throw new Error (`Couldn't get orders :${error}`)
        }
    }
    async current_Order_By_User (id :string) :Promise<Trueorder[]>{
        try{
            
            const conn = await client.connect();
            const sql = `SELECT * FROM orders WHERE users_id=${parseInt(id)}`
            const resault = await conn.query(sql);
            conn.release();
            return resault.rows;
        }   
        catch(error){
            throw new Error (`Couldn't get order with users_id ${id} :${error}`)
        }
    }
    async create_order(O:order):Promise<Trueorder>{
        try{

            const conn = await client.connect();
            const sql =   `INSERT INTO orders (users_id, status_of_order) VALUES('${O.users_id}','${O.status_of_order }') RETURNING *`  
            const resault = await conn.query(sql);
            conn.release();
            return resault.rows[0];
        }   
        catch(error){
            throw new Error (`Couldn't add order :${error}`)
        }
    }   
    async add_Product_to_Order (quantity :number ,order_Id :number ,product_Id: number) :Promise<Order_detail>{
        try{
            const conn = await client.connect();
        
            const sql = `INSERT INTO Order_Break_down(quantity,order_id,product_id) VALUES (${quantity},${order_Id},${product_Id}) RETURNING * `
            const order = await conn.query(sql);
            conn.release();
            return order.rows[0]
        }
        catch (err){
            throw new Error(`Could not add product ${product_Id} to order ${order_Id}: ${err}`)
         }
    }
    async Order_details(orderId :number):Promise<Order_detail[]>{
        try{
            const conn = await client.connect();
            const sql = `SELECT * FROM Order_Break_down WHERE order_id = ${orderId} `
            const order = await conn.query(sql);
            conn.release();
            return order.rows
        }
        catch (err){
            throw new Error(`Could not find  order ${orderId}: ${err}`)
         }
    }
    
    

}