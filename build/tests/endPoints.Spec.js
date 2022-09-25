"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("../server"));
const supertest_1 = __importDefault(require("supertest"));
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const request = (0, supertest_1.default)(server_1.default);
dotenv_1.default.config();
const { TOKEN_SECRET } = process.env;
const user_data = { "fname": "dummy", "lname": "dummy2", "password": "password" };
const product_data = { "category": 'games', "name": "sekiro", "price": 60 };
const order_data = { "order_id": 1, "product_id": 1, "quantity": 5 };
const token = jsonwebtoken_1.default.sign({ user_data }, process.env.TOKEN_SECRET);
describe('EndPoints Testing', () => {
    describe('User endpoints', () => {
        it('create a user with post', (done) => {
            request
                .post('/Users')
                .send(user_data)
                .then((res) => {
                expect(res.status).toBe(200);
                done();
            });
        });
        it('getting the user without a token should fail', (done) => {
            request
                .get("/Users")
                .then((res) => {
                expect(res.status).toBe(401);
                done();
            });
        });
        it('getting the users with token is working ', (done) => {
            request
                .get("/Users")
                .set("Authorization", "bearer " + token)
                .then((res) => {
                expect(res.status).toBe(200);
                done();
            });
        });
        it('getting the users with token and id is working ', (done) => {
            const json = { "id": "1" };
            request
                .get("/Users/id")
                .set("Authorization", "bearer " + token).send(json)
                .then((res) => {
                expect(res.status).toBe(200);
            });
            done();
        });
    });
    describe('product endpoints', () => {
        it('getting all products should work', (done) => {
            request
                .get('/Products')
                .then((res) => {
                expect(res.status).toBe(200);
                done();
            });
        });
        it('getting the product without a token with category should work', (done) => {
            const json = { "category": "games" };
            request
                .get("/Products/category")
                .send(json)
                .then((res) => {
                expect(res.status).toBe(200);
                done();
            });
        });
        it('getting the product without a token with id should work', (done) => {
            const json = { "id": "1" };
            request
                .get("/Products/id")
                .send(json)
                .then((res) => {
                expect(res.status).toBe(200);
                done();
            });
        });
        it('creating a product with a token should work', (done) => {
            request
                .get("/Users/id")
                .set("Authorization", "bearer " + token).send(product_data)
                .then((res) => {
                expect(res.status).toBe(200);
            });
            done();
        });
    });
    describe('Order endpoints', () => {
        it('getting all orders should work', (done) => {
            request
                .get('/order')
                .then((res) => {
                expect(res.status).toBe(200);
                done();
            });
        });
        it('getting the orders of a user using a token and user id should work', (done) => {
            const json = { "id": "1" };
            request
                .get("/order/id")
                .send(json).set("Authorization", "bearer " + token)
                .then((res) => {
                expect(res.status).toBe(200);
                done();
            });
        });
        it('creating an order should work', (done) => {
            const json = { "users_id": "1", "status_of_order": "Active" };
            request
                .post("/order")
                .send(json)
                .then((res) => {
                expect(res.status).toBe(200);
                done();
            });
        });
        it('adding a product to an order should work', (done) => {
            request
                .post("/order/products")
                .set("Authorization", "bearer " + token).send(order_data)
                .then((res) => {
                expect(res.status).toBe(200);
            });
            done();
        });
    });
});
