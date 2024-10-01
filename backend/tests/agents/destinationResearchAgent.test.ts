// tests/agents/destinationResearchAgent.test.ts
import DestinationResearchAgent from '../../src/agents/destinationResearchAgent';

describe('DestinationResearchAgent', () => {
  let agent: DestinationResearchAgent;

  beforeEach(() => {
    agent = new DestinationResearchAgent();
  });

  test('suggestDestinations should return destinations based on preferences', async () => {
    const preferences = ['beach', 'luxury'];
    const suggestions = await agent.suggestDestinations(preferences);

    expect(suggestions.length).toBeGreaterThan(0);
    expect(suggestions.some(dest => dest.name === 'Maldives')).toBeTruthy();
  });

  test('suggestDestinations should return top 3 destinations', async () => {
    const preferences = ['beach', 'city', 'culture'];
    const suggestions = await agent.suggestDestinations(preferences);

    expect(suggestions.length).toBeLessThanOrEqual(3);
  });
});

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