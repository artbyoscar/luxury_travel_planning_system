import { Request, Response } from 'express';
import { getDestinationSuggestions, createItinerary } from '../services/travelService';

export const suggestDestinations = async (req: Request, res: Response) => {
  try {
    const { preferences } = req.body;
    const suggestions = await getDestinationSuggestions(preferences);
    res.json({ suggestions });
  } catch (error) {
    console.error('Failed to suggest destinations', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const generateItinerary = async (req: Request, res: Response) => {
  try {
    const { destination, lengthOfStay } = req.body;
    const itinerary = await createItinerary(destination, lengthOfStay);
    res.json({ itinerary });
  } catch (error) {
    console.error('Failed to generate itinerary', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};