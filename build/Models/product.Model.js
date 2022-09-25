"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.product_Options = void 0;
const database_1 = __importDefault(require("../database"));
class product_Options {
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM product';
            const resault = await conn.query(sql);
            conn.release();
            return resault.rows;
        }
        catch (error) {
            throw new Error(`Couldn't get users :${error}`);
        }
    }
    async show(id) {
        try {
            const conn = await database_1.default.connect();
            const sql = `SELECT * FROM product WHERE id=${parseInt(id)}`;
            const resault = await conn.query(sql);
            conn.release();
            return resault.rows[0];
        }
        catch (error) {
            throw new Error(`Couldn't get product with id ${id} :${error}`);
        }
    }
    async create(P) {
        try {
            const conn = await database_1.default.connect();
            const sql = `INSERT INTO product (name, price, category) VALUES('${P.name}',${P.price},'${P.category}') RETURNING *`;
            const resault = await conn.query(sql);
            conn.release();
            return resault.rows[0];
        }
        catch (error) {
            throw new Error(`Couldn't add product :${error}`);
        }
    }
    async index_By_Category(category) {
        try {
            const conn = await database_1.default.connect();
            const sql = `SELECT * FROM product WHERE category ='${category}'`;
            const resault = await conn.query(sql);
            conn.release();
            return resault.rows;
        }
        catch (error) {
            throw new Error(`Couldn't get products with category ${category} :${error}`);
        }
    }
}
exports.product_Options = product_Options;
