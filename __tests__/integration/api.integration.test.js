const app = require('../../app');
const request = require('supertest'); // For making HTTP requests

test('GET / returns the correct response', async () => {
  const response = await request(app).get('/');
  expect(response.statusCode).toBe(200);
  expect(response.text).toContain('Welcome');
});