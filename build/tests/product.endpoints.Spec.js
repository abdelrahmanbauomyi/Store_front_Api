"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
const request = (0, supertest_1.default)(server_1.default);
describe('product endpoints', () => {
    it('getting all products should work', (done) => {
        request.get('/Products').then((res) => {
            expect(res.status).toBe(200);
            done();
        });
    });
    it('getting the product without a token with category should work', (done) => {
        const json = { category: 'games' };
        request
            .get('/Products/category')
            .send(json)
            .then((res) => {
            expect(res.status).toBe(200);
            done();
        });
    });
    it('getting the product without a token with id should work', (done) => {
        const json = { id: '1' };
        request
            .get('/Products/id')
            .send(json)
            .then((res) => {
            expect(res.status).toBe(200);
            done();
        });
    });
});
