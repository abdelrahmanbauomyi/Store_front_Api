import app from '../server';
import { user } from '../Models/user.Model';
import { product } from '../Models/product.Model';
import { Order_detail, order } from '../Models/order.Model';
import supertest from 'supertest';
import dotenv from 'dotenv';
const request = supertest(app);
dotenv.config();
const user_data: user = {
  fname: 'dummy',
  lname: 'dummy2',
  password: 'password',
};
const product_data: product = { category: 'games', name: 'sekiro', price: 60 };
const order_details: Order_detail = { order_id: 1, product_id: 1, quantity: 5 };
const order_data: order = { users_id: 1, status_of_order: 'Active' };
export let token: string;

beforeAll(async () => {
  let response = await request.post('/Users').send(user_data); // a test for the post and the creation method in the users model
  token = response.body; // if token is working then all tests shoild pass
  response = await request
    .post('/Products')
    .send(product_data)
    .set('Authorization', 'bearer ' + token); // a test for the post and the creation method in the product model model
  response = await request.post('/order').send(order_data);
  response = await request
    .post('/order/products')
    .send(order_details)
    .set('Authorization', 'bearer ' + token);
});
