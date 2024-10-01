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

