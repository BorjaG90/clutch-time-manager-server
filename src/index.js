import app from './app';
import { db } from './config/database'

require('dotenv').config();

async function main() {

  // Test DB
  db.authenticate()
    .then(() => console.log('[DB] Database connected...'))
    .catch(err => console.log('Error: ' + err))


  // Init server
  let port = process.env.PORT || 3500;
  await app.listen(port, function () {
    console.log(`-[ClutchTime Manager server listening in port: ${port}]-`);
  });
}

main();