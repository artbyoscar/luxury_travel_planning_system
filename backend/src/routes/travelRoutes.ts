import express, { Router } from 'express';
import { authMiddleware } from '../middleware/auth';
import { validateItineraryRequest } from '../middleware/validation';
import DestinationResearchAgent from '../agents/destinationResearchAgent';
import ItineraryPlanningAgent from '../agents/itineraryPlanningAgent';

const router: Router = express.Router();
const destinationAgent = new DestinationResearchAgent();
const itineraryAgent = new ItineraryPlanningAgent();

router.use(authMiddleware);

router.get('/destinations', async (req, res) => {
  try {
    const { preferences } = req.query;
    const suggestions = await destinationAgent.suggestDestinations(preferences as string[]);
    res.json({ suggestions });
  } catch (error) {
    res.status(500).json({ error: 'Failed to suggest destinations' });
  }
});

router.post('/itinerary', validateItineraryRequest, async (req, res) => {
  try {
    const { destination, lengthOfStay } = req.body;
    const itinerary = await itineraryAgent.createItinerary(destination, lengthOfStay);
    res.json({ itinerary });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create itinerary' });
  }
});

export default router;