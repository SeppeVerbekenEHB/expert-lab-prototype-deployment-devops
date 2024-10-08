const request = require('supertest');
const { app, server } = require('../../app');

describe('API Integration Tests', () => {
  // Ensure the server starts and stops properly
  afterAll(async () => {
    await new Promise(resolve => server.close(resolve));
  });

  // Test the GET root route
  test('GET / returns the welcome message', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('Welcome to the API!');
    expect(response.text).toContain('Welcome');
  });

  // Test the GET all items
  test('GET /items returns all items', async () => {
    const response = await request(app).get('/items');
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(2); // Adjust based on initial data
  });

  // Test the GET single item
  test('GET /items/:id returns a single item', async () => {
    const response = await request(app).get('/items/1');
    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe('Item 1');
  });

  // Test the POST route
  test('POST /items creates a new item', async () => {
    const response = await request(app)
      .post('/items')
      .send({ name: 'Item 3' });
    expect(response.statusCode).toBe(201);
    expect(response.body.name).toBe('Item 3');
  });

  // Test the DELETE route
  test('DELETE /items/:id removes an item', async () => {
    const response = await request(app).delete('/items/1'); // Delete the item with id 1
    expect(response.statusCode).toBe(204); // No content status for successful delete
  });

  // Test for not found item
  test('GET /items/:id for non-existent item returns 404', async () => {
    const response = await request(app).get('/items/999');
    expect(response.statusCode).toBe(404);
  });

  // Test for items length after deletion of one item
  test('GET /items returns one item after deletion', async () => {
    const response = await request(app).get('/items');
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(2);
  });
});
