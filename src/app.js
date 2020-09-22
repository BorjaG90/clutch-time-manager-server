import express, {json} from 'express';
import morgan from 'morgan';

require('dotenv').config();

let app = express();

// Middlewares
app.use(morgan('dev'));
app.use(json());

// Init server
let port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log(`ClutchTime Manager server listening in port: ${port}`);
});

export default app;