// tests/agents/itineraryPlanningAgent.test.ts
import ItineraryPlanningAgent from '../../src/agents/itineraryPlanningAgent';

describe('ItineraryPlanningAgent', () => {
  let agent: ItineraryPlanningAgent;

  beforeEach(() => {
    agent = new ItineraryPlanningAgent();
  });

  test('createItinerary should return activities for a given destination', async () => {
    const itinerary = await agent.createItinerary('Maldives', 3);

    expect(itinerary.length).toBe(3);
    expect(itinerary.some(activity => activity.name === 'Private sunset dinner on the beach')).toBeTruthy();
  });

  test('createItinerary should return empty array for unknown destination', async () => {
    const itinerary = await agent.createItinerary('Unknown', 3);

    expect(itinerary.length).toBe(0);
  });
});