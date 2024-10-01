// tests/integration/travelPlanning.test.ts
import request from 'supertest';
import app from '../../src/app';
import { createTestUser, deleteTestUser } from '../helpers/authHelper';

describe('Travel Planning Integration', () => {
  let authToken: string;

  beforeAll(async () => {
    authToken = await createTestUser();
  });

  afterAll(async () => {
    await deleteTestUser();
  });

  test('Full travel planning flow', async () => {
    // Set user preferences
    const preferencesResponse = await request(app)
      .post('/api/users/preferences')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ preferences: ['beach', 'luxury'] });

    expect(preferencesResponse.status).toBe(200);

    // Get destination suggestions
    const suggestionsResponse = await request(app)
      .get('/api/users/suggest-destinations')
      .set('Authorization', `Bearer ${authToken}`);

    expect(suggestionsResponse.status).toBe(200);
    expect(suggestionsResponse.body.suggestions.length).toBeGreaterThan(0);

    const destination = suggestionsResponse.body.suggestions[0].name;

    // Create itinerary
    const itineraryResponse = await request(app)
      .post('/api/users/create-itinerary')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ destination, lengthOfStay: 3 });

    expect(itineraryResponse.status).toBe(200);
    expect(itineraryResponse.body.itinerary.length).toBe(3);
  });
});