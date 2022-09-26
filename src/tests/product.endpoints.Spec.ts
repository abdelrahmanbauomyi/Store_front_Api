import supertest from 'supertest';
import app from '../server';
const request = supertest(app);

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
