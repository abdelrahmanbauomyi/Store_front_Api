"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
const request = (0, supertest_1.default)(server_1.default);
const endPoints_Spec_1 = require("./endPoints.Spec");
describe('Order endpoints', () => {
    it('getting the orders of a user using a token and user id should work', (done) => {
        const json = { user_id: '1' };
        request
            .get('/order/id')
            .send(json)
            .set('Authorization', 'bearer ' + endPoints_Spec_1.token)
            .then((res) => {
            expect(res.status).toBe(200);
            done();
        });
    });
    it('getting all orders should work', (done) => {
        request
            .get('/order')
            .set('Authorization', 'bearer ' + endPoints_Spec_1.token)
            .then((res) => {
            expect(res.status).toBe(200);
            done();
        });
    });
    it('getting order details should work', (done) => {
        const json = { order_id: '1' };
        request
            .get('/order/products/id')
            .set('Authorization', 'bearer ' + endPoints_Spec_1.token)
            .send(json)
            .then((res) => {
            expect(res.status).toBe(200);
            done();
        });
    });
});
