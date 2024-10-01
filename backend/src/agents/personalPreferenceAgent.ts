// src/agents/personalPreferenceAgent.ts
import { Agent, Task } from 'crew-ai';

interface PreferenceCategories {
  destinations: string[];
  activities: string[];
  cuisines: string[];
  accommodations: string[];
  travelStyles: string[];
}

class PersonalPreferenceAgent extends Agent {
  constructor() {
    super('Personal Preference Agent');
  }

  async analyzePreferences(userInputs: string[]): Promise<PreferenceCategories> {
    const task = new Task('Analyze user preferences', async () => {
      const categories: PreferenceCategories = {
        destinations: [],
        activities: [],
        cuisines: [],
        accommodations: [],
        travelStyles: []
      };

      for (const input of userInputs) {
        if (['beach', 'mountain', 'city', 'countryside', 'island'].includes(input)) {
          categories.destinations.push(input);
        } else if (['hiking', 'surfing', 'fine dining', 'shopping', 'sightseeing'].includes(input)) {
          categories.activities.push(input);
        } else if (['Italian', 'French', 'Asian', 'Mediterranean', 'Fusion'].includes(input)) {
          categories.cuisines.push(input);
        } else if (['luxury resort', 'boutique hotel', 'private villa', 'yacht'].includes(input)) {
          categories.accommodations.push(input);
        } else if (['relaxation', 'adventure', 'cultural', 'romantic', 'family-friendly'].includes(input)) {
          categories.travelStyles.push(input);
        }
      }

      return categories;
    });

    return await this.executeTask(task) as PreferenceCategories;
  }

  async generateUserProfile(preferences: PreferenceCategories): Promise<string> {
    const task = new Task('Generate user profile', async () => {
      let profile = "This traveler prefers ";
      
      if (preferences.destinations.length > 0) {
        profile += `${preferences.destinations.join(' and ')} destinations, `;
      }
      if (preferences.activities.length > 0) {
        profile += `enjoys ${preferences.activities.join(' and ')}, `;
      }
      if (preferences.cuisines.length > 0) {
        profile += `has a taste for ${preferences.cuisines.join(' and ')} cuisine, `;
      }
      if (preferences.accommodations.length > 0) {
        profile += `prefers staying in ${preferences.accommodations.join(' or ')}, `;
      }
      if (preferences.travelStyles.length > 0) {
        profile += `and leans towards ${preferences.travelStyles.join(' and ')} travel experiences.`;
      }

      return profile.trim();
    });

    return await this.executeTask(task) as string;
  }
}

export default PersonalPreferenceAgent;