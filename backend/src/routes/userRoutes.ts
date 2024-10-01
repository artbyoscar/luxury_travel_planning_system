// src/routes/userRoutes.ts
import express, { Router } from 'express';
import { authMiddleware, AuthRequest } from '../middleware/auth';
import PersonalPreferenceAgent from '../agents/personalPreferenceAgent';
import DestinationResearchAgent from '../agents/destinationResearchAgent';
import ItineraryPlanningAgent from '../agents/itineraryPlanningAgent';
import { saveUserPreferences, getUserPreferences } from '../services/database';
import { validatePreferences, validateItineraryRequest } from '../middleware/validation';

const router: Router = express.Router();
const preferenceAgent = new PersonalPreferenceAgent();
const destinationAgent = new DestinationResearchAgent();
const itineraryAgent = new ItineraryPlanningAgent();

router.use(authMiddleware);

router.get('/profile', async (req: AuthRequest, res) => {
  const preferences = await getUserPreferences(req.user!.uid);
  res.json({ user: req.user, preferences });
});

router.post('/preferences', async (req: AuthRequest, res) => {
  try {
    const { preferences } = req.body;
    const analysis = await preferenceAgent.analyzePreferences(preferences);
    const userProfile = await preferenceAgent.generateUserProfile(analysis);
    await saveUserPreferences(req.user!.uid, { analysis, userProfile });
    res.json({ message: 'Preferences updated', analysis, userProfile });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update preferences' });
  }
});

router.get('/suggest-destinations', async (req: AuthRequest, res) => {
  try {
    const preferences = await getUserPreferences(req.user!.uid);
    const suggestions = await destinationAgent.suggestDestinations(preferences.analysis.destinations);
    res.json({ suggestions });
  } catch (error) {
    res.status(500).json({ error: 'Failed to suggest destinations' });
  }
});

router.post('/create-itinerary', async (req: AuthRequest, res) => {
  try {
    const { destination, lengthOfStay } = req.body;
    const itinerary = await itineraryAgent.createItinerary(destination, lengthOfStay);
    res.json({ itinerary });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create itinerary' });
  }
});

export default router;