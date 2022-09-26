import supertest from 'supertest';
import app from '../server';
const request = supertest(app);
import { token } from './endPoints.Spec';

describe('Order endpoints', () => {
  it('getting the orders of a user using a token and user id should work', (done) => {
    const json = { user_id: '1' };

    request
      .get('/order/id')
      .send(json)
      .set('Authorization', 'bearer ' + token)
      .then((res) => {
        expect(res.status).toBe(200);
        done();
      });
  });
  it('getting all orders should work', (done) => {
    request.get('/order').then((res) => {
      expect(res.status).toBe(200);
      done();
    });
  });
  it('getting order details should work', (done) => {
    const json = { order_id: '1' };
    request
      .get('/order/products/id')
      .set('Authorization', 'bearer ' + token)
      .send(json)
      .then((res) => {
        expect(res.status).toBe(200);
        done();
      });
  });
});
