import express, {json} from 'express';
import morgan from 'morgan';
import passport from 'passport';

import errorMdw from './middleware/error';

import sportsRoutes from './routes/sport.routes';
import userRoutes from './routes/user.routes';
import clubRoutes from './routes/club.routes';
import teamRoutes from './routes/team.routes';
import playerRoutes from './routes/player.routes';

let app = express();

// Passport config
require('./config/passport')(passport);

// Third party middlewares
app.use(passport.initialize());
app.use('/public', express.static(process.cwd() + '/public'));
app.use(morgan('dev'));
app.use(json());

// Routes
app.use('/api/sports', sportsRoutes);
app.use('/api/users', userRoutes);
app.use('/api/clubs', clubRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/players', playerRoutes);

//Middleware for errores
app.use(errorMdw.errorHandler);
app.use(errorMdw.notFoundHandler);


export default app;