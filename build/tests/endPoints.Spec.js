"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.token = void 0;
const server_1 = __importDefault(require("../server"));
const supertest_1 = __importDefault(require("supertest"));
const dotenv_1 = __importDefault(require("dotenv"));
const request = (0, supertest_1.default)(server_1.default);
dotenv_1.default.config();
const user_data = {
    fname: 'dummy',
    lname: 'dummy2',
    password: 'password',
};
const product_data = { category: 'games', name: 'sekiro', price: 60 };
const order_details = { order_id: 1, product_id: 1, quantity: 5 };
const order_data = { users_id: 1, status_of_order: 'Active' };
beforeAll(async () => {
    let response = await request.post('/Users').send(user_data); // a test for the post and the creation method in the users model
    exports.token = response.body; // if token is working then all tests shoild pass
    response = await request
        .post('/Products')
        .send(product_data)
        .set('Authorization', 'bearer ' + exports.token); // a test for the post and the creation method in the product model model
    response = await request
        .post('/order')
        .send(order_data)
        .set('Authorization', 'bearer ' + exports.token);
    response = await request
        .post('/order/products')
        .send(order_details)
        .set('Authorization', 'bearer ' + exports.token);
});
