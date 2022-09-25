"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.user_Options = void 0;
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;
class user_Options {
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM user_table';
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
            const sql = `SELECT * FROM user_table WHERE id=${parseInt(id)}`;
            const resault = await conn.query(sql);
            conn.release();
            return resault.rows[0];
        }
        catch (error) {
            throw new Error(`Couldn't get user with id ${id} :${error}`);
        }
    }
    async create(U) {
        try {
            const conn = await database_1.default.connect();
            const hash = bcrypt_1.default.hashSync(U.password + BCRYPT_PASSWORD, parseInt(SALT_ROUNDS));
            const sql = `INSERT INTO user_table ( fname, Lname, password) VALUES('${U.fname}', '${U.lname}', '${hash}') RETURNING *`;
            const resault = await conn.query(sql);
            conn.release();
            return resault.rows[0];
        }
        catch (error) {
            throw new Error(`Couldn't add users :${error}`);
        }
    }
}
exports.user_Options = user_Options;
