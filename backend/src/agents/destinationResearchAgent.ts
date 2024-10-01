// src/agents/destinationResearchAgent.ts
import { Agent, Task } from 'crew-ai';
import axios from 'axios';

interface Destination {
  name: string;
  description: string;
  tags: string[];
}

class DestinationResearchAgent extends Agent {
  private destinations: Destination[] = [
    { name: 'Maldives', description: 'Luxury island paradise', tags: ['beach', 'luxury', 'relaxation'] },
    { name: 'Swiss Alps', description: 'Scenic mountain retreat', tags: ['mountain', 'adventure'] },
    { name: 'Tokyo', description: 'Vibrant city experience', tags: ['city', 'culture', 'luxury'] },
    { name: 'Bali', description: 'Cultural island getaway', tags: ['island', 'beach', 'relaxation'] },
    { name: 'New York', description: 'The city that never sleeps', tags: ['city', 'culture'] }
  ];

  private weights: { [key: string]: number } = {
    beach: 2,
    mountain: 2,
    city: 2,
    countryside: 2,
    island: 2,
    adventure: 1.5,
    relaxation: 1.5,
    culture: 1.5,
    luxury: 2,
  };

  constructor() {
    super('Destination Research Agent');
  }

  async suggestDestinations(preferences: string[]): Promise<Destination[]> {
    const task = new Task('Suggest destinations', async () => {
      const scoredDestinations = this.destinations.map(dest => ({
        ...dest,
        score: this.calculateScore(dest, preferences)
      }));

      const sortedDestinations = scoredDestinations
        .sort((a, b) => b.score - a.score)
        .slice(0, 5);

      const enhancedDestinations = await Promise.all(
        sortedDestinations.map(async (dest) => {
          const weatherInfo = await this.getWeatherInfo(dest.name);
          const localEvents = await this.getLocalEvents(dest.name);
          return {
            ...dest,
            weatherInfo,
            localEvents
          };
        })
      );

      return enhancedDestinations;
    });

    return await this.executeTask(task) as Destination[];
  }

  private calculateScore(destination: Destination, preferences: string[]): number {
    return preferences.reduce((score, pref) => {
      if (destination.tags.includes(pref)) {
        score += this.weights[pref] || 0;
      }
      return score;
    }, 0);
  }
}

private async getWeatherInfo(destination: string): Promise<string> {
  // Implement API call to a weather service
  // For now, we'll return a placeholder
  return `Sunny, 25°C`;
}

private async getLocalEvents(destination: string): Promise<string[]> {
  // Implement API call to an events service
  // For now, we'll return placeholders
  return ['Local Food Festival', 'Art Exhibition'];
}
}

export default DestinationResearchAgent;