// src/agents/itineraryPlanningAgent.ts
import { Agent, Task } from 'crew-ai';

interface Activity {
  name: string;
  description: string;
}

class ItineraryPlanningAgent extends Agent {
  private activities: { [key: string]: Activity[] } = {
    'Maldives': [
      { name: 'Private sunset dinner on the beach', description: 'Enjoy a romantic dinner with a breathtaking view' },
      { name: 'Scuba diving with marine biologists', description: 'Explore the vibrant underwater world' },
      { name: 'Spa day at luxury resort', description: 'Indulge in relaxing treatments at a world-class spa' },
    ],
    'Bali': [
      { name: 'Temple tour with local guide', description: 'Discover the rich cultural heritage of Bali' },
      { name: 'Cooking class with a chef', description: 'Learn to prepare authentic Balinese dishes' },
      { name: 'Surfing lessons', description: 'Catch waves at a beautiful Balinese beach' },
    ],
    'Tokyo': [
      { name: 'Private guided tour of shrines', description: 'Explore ancient Shinto shrines with an expert guide' },
      { name: 'Sushi making class', description: 'Learn the art of sushi from a master chef' },
      { name: 'Nightlife experience in Shinjuku', description: 'Discover Tokyo\'s vibrant nightlife scene' },
    ],
  };

  constructor() {
    super('Itinerary Planning Agent');
  }

  async createItinerary(destination: string, lengthOfStay: number): Promise<Activity[]> {
    const task = new Task('Create itinerary', async () => {
      if (destination in this.activities) {
        return this.activities[destination].slice(0, lengthOfStay);
      }
      return [];
    });

    return await this.executeTask(task) as Activity[];
  }
}

export default ItineraryPlanningAgent;