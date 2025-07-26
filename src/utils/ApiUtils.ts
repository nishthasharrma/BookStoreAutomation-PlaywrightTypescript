// src/utils/ApiUtils.ts
import { request } from '@playwright/test';

export async function getToken(): Promise<string> {
  const context = await request.newContext();
  const response = await context.post('http://127.0.0.1:8000/login', {
    data: {
      id: 0,
      email: 'string',
      password: 'string'
    },
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const status = response.status();
  const raw = await response.text();

  if (!response.ok()) {
    throw new Error(`Login failed with status ${status}`);
  }

  const body = JSON.parse(raw);

  if (!body.access_token) {
    throw new Error('Token not found in login response');
  }

  return body.access_token;
}
