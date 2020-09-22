import express, {json} from 'express';
import morgan from 'morgan';

import teamRoutes from './routes/teams';
import playerRoutes from './routes/players';

let app = express();

// Middlewares
app.use(morgan('dev'));
app.use(json());

// Routes
app.use('/api/teams', teamRoutes);
app.use('/api/players', playerRoutes);

export default app;