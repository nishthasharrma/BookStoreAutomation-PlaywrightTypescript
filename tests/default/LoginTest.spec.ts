import { test, request, expect } from '@playwright/test';
import { config } from '../../src/config/env.config';
const loginRequestPayload ={"id": 0,
  "email": "string",
  "password": "string"};
 let access_token;
test('login with valid token',async()=>{
const loginRequest= await request.newContext();
    const getLoginResponse = await loginRequest.post(`${config.baseUrl}/login`,
        {
        headers :  {
        'accept': 'application/json',
        'Content-type': 'application/json'
        },
        data: loginRequestPayload,    
        }
    )
    expect(getLoginResponse.status()).toBe(200);
    expect(getLoginResponse.ok()).toBeTruthy();
    const body = await getLoginResponse.json();
    access_token = await body.access_token;
    console.log(body.access_token);
    return access_token;

});

test('invalid login', async()=>{
    const loginRequest= await request.newContext();
    const getLoginResponse = await loginRequest.post(`${config.baseUrl}/login`,
        {
        headers :  {
        'Content-type': 'application/json'
        },    
        }
    )
    console.log(getLoginResponse.status());
     const body = await getLoginResponse.json();
 console.log(body);
  expect(getLoginResponse.status()).toBe(422);
  expect(getLoginResponse.ok()).toBeFalsy();
 const missingFieldError = body.detail.find((err: any) => err.type === 'missing');
  expect(missingFieldError).toBeDefined();
  expect(missingFieldError.msg).toMatch(/field required/i);
  expect(missingFieldError.input).toBeNull();
  expect(Array.isArray(missingFieldError.loc)).toBe(true);
});