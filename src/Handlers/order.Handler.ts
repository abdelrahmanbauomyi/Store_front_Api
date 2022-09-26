import express, { Request, Response } from 'express';
import { order, order_Options } from '../Models/order.Model';
import verifiy_Token from './Auth.middelware';

const Options = new order_Options();

const index = async (req: Request, res: Response) => {
  try {
    const listOfOrders = await Options.index();
    res.json(listOfOrders);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const show_user_orders = async (req: Request, res: Response) => {
  try {
    const user_id = req.body.user_id;
    const requested_Order = await Options.current_Order_By_User(user_id);
    res.json(requested_Order);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
const create = async (req: Request, res: Response) => {
  try {
    const Order: order = {
      users_id: req.body.users_id,
      status_of_order: req.body.status_of_order,
    };
    const newOrder = await Options.create_order(Order);
    res.json(newOrder);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
const add_Product_To_Order = async (req: Request, res: Response) => {
  try {
    const order_id: number = req.body.order_id;
    const product_id: number = req.body.product_id;
    const quantity: number = req.body.quantity;
    const product_order = await Options.add_Product_to_Order(
      quantity,
      order_id,
      product_id
    );
    res.json(product_order);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
const get_Order_details = async (req: Request, res: Response) => {
  try {
    const order_id: number = req.body.order_id;
    const requested_Order = await Options.Order_details(order_id);
    res.json(requested_Order);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const orderRoutes = (app: express.Application) => {
  app.get('/order', verifiy_Token, index);
  app.get('/order/id', verifiy_Token, show_user_orders);
  app.get('/order/products/id', verifiy_Token, get_Order_details);
  app.post('/order', verifiy_Token, create);
  app.post('/order/products', verifiy_Token, add_Product_To_Order);
};
export default orderRoutes;
