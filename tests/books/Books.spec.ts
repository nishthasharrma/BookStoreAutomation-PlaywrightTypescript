import { test, request, expect, APIRequestContext } from '@playwright/test';
import { getToken } from '../../src/utils/ApiUtils';
import { config } from '../../src/config/env.config';

const baseUrl = `${config.baseUrl}/books/`;

test.describe('Books Request Chaining with Validations', () => {
  let access_token: string;
  let context: APIRequestContext;
  let createdBookId: number;

  test.beforeAll(async () => {
    access_token = await getToken();
    context = await request.newContext({
      extraHTTPHeaders: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
    });
  });

  test('Create, Get, Update, Delete book and validate', async () => {
    const bookName = `Book-${Date.now()}`;

    const createPayload = {
      id: Math.floor(Math.random() * 10000),
      name: bookName,
      author: 'Author',
      published_year: 2025,
      book_summary: 'Adding new book',
    };

    // 1. Create
    const createRes = await context.post(baseUrl, { data: createPayload });
    const createBody = await createRes.json();

    expect(createRes.status()).toBe(200);
    expect(createRes.ok()).toBeTruthy();
    expect(createRes.headers()['content-type']).toContain('application/json');
    expect(createBody).toMatchObject(createPayload);

    createdBookId = createBody.id;
    expect(createdBookId).toBeDefined();

    // 2. Get by ID
    const getRes = await context.get(`${baseUrl}${createdBookId}`);
    const getBody = await getRes.json();

    expect(getRes.status()).toBe(200);
    expect(getRes.ok()).toBeTruthy();
    expect(getRes.headers()['content-type']).toContain('application/json');
    expect(getBody).toMatchObject(createPayload);

    // 3. Update
    const updatedPayload = {
      ...createPayload,
      name: `${bookName}-Updated`,
      author: 'Updated Author',
    };

    const updateRes = await context.put(`${baseUrl}${createdBookId}`, { data: updatedPayload });
    const updateBody = await updateRes.json();

    expect(updateRes.status()).toBe(200);
    expect(updateRes.ok()).toBeTruthy();
    expect(updateRes.headers()['content-type']).toContain('application/json');
    expect(updateBody.name).toBe(updatedPayload.name);
    expect(updateBody.author).toBe(updatedPayload.author);

    // 4. Delete
    const deleteRes = await context.delete(`${baseUrl}${createdBookId}`);
    const deleteBody = await deleteRes.json();

    expect(deleteRes.status()).toBe(200);
    expect(deleteRes.ok()).toBeTruthy();
    expect(deleteRes.headers()['content-type']).toContain('application/json');
    expect(deleteBody.message).toBe('Book deleted successfully');

    // 5. Get after deletion - should return 404
    const getDeletedRes = await context.get(`${baseUrl}${createdBookId}`);
    expect(getDeletedRes.status()).toBe(404);
    expect(getDeletedRes.headers()['content-type']).toContain('application/json');
  });

  test('Create book with invalid payload should return 422', async () => {

    const response = await context.post(baseUrl);
    const body = await response.json();

    expect(response.status()).toBe(422);
    expect(response.ok()).toBeFalsy();

    const firstError = body.detail[0];
    expect(firstError).toHaveProperty('msg');
    expect(firstError.msg.toLowerCase()).toContain('field required');
    expect(firstError.type).toBe('missing');
    expect(firstError.loc).toContain('body');

    const contentType = response.headers()['content-type'];
    expect(contentType).toContain('application/json');
  });
});
