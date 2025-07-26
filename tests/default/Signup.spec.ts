import { test, request, expect, APIRequestContext } from '@playwright/test';
import { getToken } from '../../src/utils/ApiUtils';
import { config } from '../../src/config/env.config';

const uniqueEmail = `testuser_${Date.now()}@example.com`;

const signUpPayload = {
  id: Math.floor(Math.random() * 10000),
  email: uniqueEmail,
  password: 'string3'
};


test.describe('Signup', () => {
    
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
test('signup',async()=>{
    
    const signUpResponse = await context.post(`${config.baseUrl}/signup`,
        {
        data: signUpPayload,
        }
    )
    console.log(signUpResponse.status());
    const signUpBody = await signUpResponse.json();
    console.log(signUpBody);
    expect(signUpResponse.status()).toBe(200);
    expect(signUpResponse.ok()).toBeTruthy();
});
test('signup with invalid request',async()=>{
    const signUpResponse = await context.post(`${config.baseUrl}/signup`)
    console.log(signUpResponse.status());
    const signUpBody = await signUpResponse.json();
    expect(signUpResponse.status()).toBe(422);
  expect(signUpResponse.ok()).toBeFalsy();
 const missingFieldError = signUpBody.detail.find((err: any) => err.type === 'missing');
  expect(missingFieldError).toBeDefined();
  expect(missingFieldError.msg).toMatch(/field required/i);
  expect(missingFieldError.input).toBeNull();
  expect(Array.isArray(missingFieldError.loc)).toBe(true);
});
});