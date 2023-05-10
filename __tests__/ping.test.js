const axios = require('axios');
const app = require('../app');
const request = require('supertest')(app);

jest.mock('axios');

describe('Ping endpoint', () => {
  it('should respond with status code 200 and correct response body', async () => {
    const message = 'What a great test message';
    const expectedResponse = {
      echo: { message },
      timestamp: expect.any(Number),
      env: process.env.NODE_ENV,
      version: expect.any(String),
    };

    axios.get.mockResolvedValueOnce({ data: { message } });

    const response = await request.post('/ping').send({ message });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(expectedResponse);
    expect(axios.get).toHaveBeenCalledWith(`https://postman-echo.com/get?message=${message}`);
  });

  it('should respond with status code 404 when Postman Echo service is not available', async () => {
    axios.get.mockRejectedValueOnce(new Error('Not Found'));

    const response = await request.post('/ping').send({ message: 'test' });

    expect(response.statusCode).toBe(404);
  });

  it('should respond with status code 400 when message is not provided', async () => {
    const response = await request.post('/ping');

    expect(response.statusCode).toBe(400);
  });
});