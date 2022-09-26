import supertest from 'supertest';
import app from '../server';
const request = supertest(app);
import { token } from './endPoints.Spec';

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
      .set('Authorization', 'bearer ' + token)
      .then((res) => {
        expect(res.status).toBe(200);
        done();
      });
  });
  it('getting the users with token and id is working ', (done) => {
    const json = { id: '1' };
    request
      .get('/Users/id')
      .set('Authorization', 'bearer ' + token)
      .send(json)
      .then((res) => {
        expect(res.status).toBe(200);
      });
    done();
  });
});
