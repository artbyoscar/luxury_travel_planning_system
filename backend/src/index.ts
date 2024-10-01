import express, { Express, Request, Response } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import userRoutes from './routes/userRoutes';
import travelRoutes from './routes/travelRoutes';
import { errorHandler } from './middleware/errorHandler';
import { apiLimiter } from './middleware/rateLimiter';
import connectDB from './config/database';

const app: Express = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(morgan('combined'));
app.use(helmet());
app.use(express.json());
app.use(apiLimiter);

// Routes
app.use('/api/users', userRoutes);
app.use('/api/travel', travelRoutes);

// Root route
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the Luxury Travel Planning System API');
});

// Error handling middleware
app.use(errorHandler);

// Connect to database and start the server
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error: Error) => {
    console.error('Database connection error:', error);
    process.exit(1);
  });