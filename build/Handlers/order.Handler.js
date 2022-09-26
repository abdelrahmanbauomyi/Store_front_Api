"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_Model_1 = require("../Models/order.Model");
const Auth_middelware_1 = __importDefault(require("./Auth.middelware"));
const Options = new order_Model_1.order_Options();
const index = async (req, res) => {
    try {
        const listOfOrders = await Options.index();
        res.json(listOfOrders);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const show_user_orders = async (req, res) => {
    try {
        const user_id = req.body.user_id;
        const requested_Order = await Options.current_Order_By_User(user_id);
        res.json(requested_Order);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const create = async (req, res) => {
    try {
        const Order = {
            users_id: req.body.users_id,
            status_of_order: req.body.status_of_order,
        };
        const newOrder = await Options.create_order(Order);
        res.json(newOrder);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const add_Product_To_Order = async (req, res) => {
    try {
        const order_id = req.body.order_id;
        const product_id = req.body.product_id;
        const quantity = req.body.quantity;
        const product_order = await Options.add_Product_to_Order(quantity, order_id, product_id);
        res.json(product_order);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const get_Order_details = async (req, res) => {
    try {
        const order_id = req.body.order_id;
        const requested_Order = await Options.Order_details(order_id);
        res.json(requested_Order);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const orderRoutes = (app) => {
    app.get('/order', Auth_middelware_1.default, index);
    app.get('/order/id', Auth_middelware_1.default, show_user_orders);
    app.get('/order/products/id', Auth_middelware_1.default, get_Order_details);
    app.post('/order', Auth_middelware_1.default, create);
    app.post('/order/products', Auth_middelware_1.default, add_Product_To_Order);
};
exports.default = orderRoutes;
