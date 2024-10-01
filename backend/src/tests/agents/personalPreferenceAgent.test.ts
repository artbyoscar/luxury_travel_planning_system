// tests/agents/personalPreferenceAgent.test.ts
import PersonalPreferenceAgent from '../../src/agents/personalPreferenceAgent';

describe('PersonalPreferenceAgent', () => {
  let agent: PersonalPreferenceAgent;

  beforeEach(() => {
    agent = new PersonalPreferenceAgent();
  });

  test('analyzePreferences should categorize preferences correctly', async () => {
    const preferences = ['beach', 'hiking', 'Italian', 'luxury resort', 'relaxation'];
    const result = await agent.analyzePreferences(preferences);

    expect(result.destinations).toContain('beach');
    expect(result.activities).toContain('hiking');
    expect(result.cuisines).toContain('Italian');
    expect(result.accommodations).toContain('luxury resort');
    expect(result.travelStyles).toContain('relaxation');
  });

  test('generateUserProfile should create a meaningful profile', async () => {
    const preferences = {
      destinations: ['beach'],
      activities: ['hiking'],
      cuisines: ['Italian'],
      accommodations: ['luxury resort'],
      travelStyles: ['relaxation']
    };
    const profile = await agent.generateUserProfile(preferences);

    expect(profile).toContain('beach destinations');
    expect(profile).toContain('enjoys hiking');
    expect(profile).toContain('Italian cuisine');
    expect(profile).toContain('luxury resort');
    expect(profile).toContain('relaxation travel experiences');
  });
});