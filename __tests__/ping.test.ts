import { PingResponse } from "../routes/ping";

import axios from 'axios';
import app from '../app';
import request from 'supertest';

jest.mock('axios');

describe('Ping endpoint', () => {
  it('should respond with status code 200 and correct response body', async () => {
    const message: string = 'What a great test message';
    const expectedResponse: PingResponse = {
      echo: { message },
      timestamp: expect.any(Number),
      env: process.env.NODE_ENV,
      version: expect.any(String),
    };
  
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce({ data: { message } });

    const response: request.Response = await request(app)
      .post('/ping')
      .send({ message });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expectedResponse);
    expect(axios.get).toHaveBeenCalledWith(`https://postman-echo.com/get?message=${message}`);
  });

  it('should respond with status code 404 when Postman Echo service is not available', async () => {
    (axios.get as jest.MockedFunction<typeof axios.get>).mockRejectedValueOnce(new Error('Not Found'));

    const response = await request(app)
      .post('/ping')
      .send({ message: 'test' });

    expect(response.status).toBe(404);
  });

  it('should respond with status code 400 when message is not provided', async () => {
    const response = await request(app)
      .post('/ping');

    expect(response.status).toBe(400);
  });
});