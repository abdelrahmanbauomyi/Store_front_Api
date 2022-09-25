"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.order_Options = void 0;
const database_1 = __importDefault(require("../database"));
class order_Options {
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM orders';
            const resault = await conn.query(sql);
            conn.release();
            return resault.rows;
        }
        catch (error) {
            throw new Error(`Couldn't get orders :${error}`);
        }
    }
    async current_Order_By_User(id) {
        try {
            const conn = await database_1.default.connect();
            const sql = `SELECT * FROM orders WHERE users_id=${parseInt(id)}`;
            const resault = await conn.query(sql);
            conn.release();
            return resault.rows;
        }
        catch (error) {
            throw new Error(`Couldn't get order with users_id ${id} :${error}`);
        }
    }
    async create_order(O) {
        try {
            const conn = await database_1.default.connect();
            const sql = `INSERT INTO orders (users_id, status_of_order) VALUES('${O.users_id}','${O.status_of_order}') RETURNING *`;
            const resault = await conn.query(sql);
            conn.release();
            return resault.rows[0];
        }
        catch (error) {
            throw new Error(`Couldn't add order :${error}`);
        }
    }
    async add_Product_to_Order(quantity, order_Id, product_Id) {
        try {
            const conn = await database_1.default.connect();
            const sql = `INSERT INTO Order_Break_down(quantity,order_id,product_id) VALUES (${quantity},${order_Id},${product_Id}) RETURNING * `;
            const order = await conn.query(sql);
            conn.release();
            return order.rows[0];
        }
        catch (err) {
            throw new Error(`Could not add product ${product_Id} to order ${order_Id}: ${err}`);
        }
    }
    async Order_details(orderId) {
        try {
            const conn = await database_1.default.connect();
            const sql = `SELECT * FROM Order_Break_down WHERE order_id = ${orderId} `;
            const order = await conn.query(sql);
            conn.release();
            return order.rows;
        }
        catch (err) {
            throw new Error(`Could not find  order ${orderId}: ${err}`);
        }
    }
}
exports.order_Options = order_Options;
