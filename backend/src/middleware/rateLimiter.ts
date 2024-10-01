// src/middleware/rateLimiter.ts
import rateLimit from 'express-rate-limit';

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

// src/app.ts
import express from 'express';
import helmet from 'helmet';
import { apiLimiter } from './middleware/rateLimiter';

const app = express();

app.use(helmet()); // Adds various security headers
app.use('/api/', apiLimiter);

// ... rest of your app configuration