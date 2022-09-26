import client from '../database';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();
const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;
export type user = {
  fname: string;
  lname: string;
  password: string;
};
export type Trueuser = {
  id: number;
  fname: string;
  lname: string;
  password: string;
};
export class user_Options {
  async index(): Promise<Trueuser[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM user_table';
      const resault = await conn.query(sql);
      conn.release();
      return resault.rows;
    } catch (error) {
      throw new Error(`Couldn't get users :${error}`);
    }
  }
  async show(id: string): Promise<Trueuser> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM user_table WHERE id=${parseInt(id)}`;
      const resault = await conn.query(sql);
      conn.release();
      return resault.rows[0];
    } catch (error) {
      throw new Error(`Couldn't get user with id ${id} :${error}`);
    }
  }
  async create(U: user): Promise<Trueuser> {
    try {
      const conn = await client.connect();
      const hash = bcrypt.hashSync(
        U.password + BCRYPT_PASSWORD,
        parseInt(SALT_ROUNDS as string)
      );
      const sql = `INSERT INTO user_table ( fname, Lname, password) VALUES('${U.fname}', '${U.lname}', '${hash}') RETURNING *`;
      const resault = await conn.query(sql);
      conn.release();
      return resault.rows[0];
    } catch (error) {
      throw new Error(`Couldn't add users :${error}`);
    }
  }
}
