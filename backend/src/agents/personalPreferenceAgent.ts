// src/agents/personalPreferenceAgent.ts
import { Agent, Task } from 'crew-ai';

class PersonalPreferenceAgent extends Agent {
  constructor() {
    super('Personal Preference Agent');
  }

  async analyzePreferences(userInput: string): Promise<string> {
    const task = new Task('Analyze user preferences', async () => {
      // Implement preference analysis logic here
      return `Analyzed preferences: ${userInput}`;
    });

    const result = await this.executeTask(task);
    return result as string;
  }
}

export default PersonalPreferenceAgent;