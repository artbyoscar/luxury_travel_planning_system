// src/routes/userRoutes.ts
import express, { Router } from 'express';

const router: Router = express.Router();

router.get('/', (req, res) => {
  res.send('User profile');
});

router.post('/preferences', (req, res) => {
  res.send('Update user preferences');
});

export default router;