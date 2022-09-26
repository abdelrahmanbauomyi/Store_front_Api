"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
const request = (0, supertest_1.default)(server_1.default);
const endPoints_Spec_1 = require("./endPoints.Spec");
describe('User endpoints', () => {
    it('getting the user without a token should fail', (done) => {
        request.get('/Users').then((res) => {
            expect(res.status).toBe(401);
            done();
        });
    });
    it('getting the users with token is working ', (done) => {
        request
            .get('/Users')
            .set('Authorization', 'bearer ' + endPoints_Spec_1.token)
            .then((res) => {
            expect(res.status).toBe(200);
            done();
        });
    });
    it('getting the users with token and id is working ', (done) => {
        const json = { id: '1' };
        request
            .get('/Users/id')
            .set('Authorization', 'bearer ' + endPoints_Spec_1.token)
            .send(json)
            .then((res) => {
            expect(res.status).toBe(200);
        });
        done();
    });
});
