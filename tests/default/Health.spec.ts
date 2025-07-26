import { test, request, expect, APIRequestContext } from '@playwright/test';
import { getToken } from '../../src/utils/ApiUtils';
import { config } from '../../src/config/env.config';

test.describe('Health', () => {
  let access_token: string;
  let context: APIRequestContext;

  test.beforeAll(async () => {
    access_token = await getToken();
    console.log('Token:', access_token);

    context = await request.newContext({
      extraHTTPHeaders: {
        'Authorization': `Bearer ${access_token}`,
        'Content-Type': 'application/json'
      }
    });
  });

test('get all books with valid token',async()=>{
    const getHealth= await request.newContext();
    const getHealthResponse = await getHealth.get(`${config.baseUrl}/health`,
        {
        headers :  {
        'accept': 'application/json',
        'Content-type': 'application/json'
        },   
        }
    )
     expect(getHealthResponse.status()).toBe(200);
    expect(getHealthResponse.ok()).toBeTruthy();
    const body = await getHealthResponse.json();
    console.log(body);
   const contentType = getHealthResponse.headers()['content-type'];
    expect(contentType).toContain('application/json');
    expect(body).toHaveProperty('status');
    expect(body.status).toBe('up');

});
});