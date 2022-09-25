import { order,order_Options } from "../Models/order.Model";
import client from "../database";
const Options = new order_Options();


beforeAll(async()=>{
    let sql = `INSERT INTO product (name, price, category) VALUES('sekiro',60,'games') RETURNING *`;
    const conn = await client.connect();
    let resault = await conn.query(sql);
    sql = `INSERT INTO user_table ( fname, Lname, password) VALUES('dummy', 'dummy2', 'password') RETURNING *`
    resault = await conn.query(sql);

})

describe("Order Model",()=>{
    
    it('should have index method',()=>{
        expect(Options.index).toBeDefined();
    });
    it('should have a create_order method',()=>{
        expect (Options.create_order).toBeDefined();
    });
    it('should have a Order_details method',()=>{
        expect(Options.Order_details).toBeDefined();
    });

    it('should have a add_Product_to_Order method',()=>{
        expect(Options.add_Product_to_Order).toBeDefined();
    });
    it('should have a current_Order_By_User method',()=>{
        expect(Options.current_Order_By_User).toBeDefined();
    })
    it('index should return list of Orders',async ()=>{
        // const res = await Options.index()
        // expect(res).toEqual([])//empty to check test db migration is working correctly
    });
    it('create method should add an Order ', async () => {
        const Order:order ={
            "users_id":1,
            "status_of_order":"active"
        }
        const result = await Options.create_order(Order);
        expect(result.users_id.toString()).toEqual('1');
        expect(result.status_of_order).toEqual("active")
      });

      it('add product to an order is working correctly',async ()=>{
        const result = await Options.add_Product_to_Order(5,1,1)
        expect(result.order_id.toString()).toEqual('1');
        expect(result.product_id.toString()).toEqual('1');
        expect(result.quantity).toEqual(5);
      });
      it('Order_details working correctly',async ()=>{
        
        const result = await Options.Order_details(1)
        expect(result[0].order_id.toString()).toEqual('1');
        expect(result[0].product_id.toString()).toEqual('1');
        expect(result[0].quantity).toEqual(5);
        
      });
      it('current_Order_By_User working correctly',async ()=>{
        const result = await Options.current_Order_By_User('1')
        expect(result[0].id).toEqual(1);
        expect(result[0].users_id.toString()).toEqual('1');
        expect(result[0].status_of_order).toEqual("active");
      });
      
})