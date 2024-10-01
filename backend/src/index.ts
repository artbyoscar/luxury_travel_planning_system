// src/index.ts
import express, { Express, Request, Response } from 'express';
import userRoutes from './routes/userRoutes';
import { errorHandler } from './middleware/errorHandler';

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/users', userRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the Luxury Travel Planning System API');
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});