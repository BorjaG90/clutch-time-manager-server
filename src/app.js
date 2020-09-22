import express, {json} from 'express';
import morgan from 'morgan';

import userRoutes from './routes/user.routes';
import teamRoutes from './routes/team.routes';
import playerRoutes from './routes/player.routes';

let app = express();

// Middlewares
app.use(morgan('dev'));
app.use(json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/players', playerRoutes);

export default app;