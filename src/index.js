import app from './app';

require('dotenv').config();

async function main() {
  // Init server
  let port = process.env.PORT || 3500;
  await app.listen(port, function () {
    console.log(`ClutchTime Manager server listening in port: ${port}`);
  });
}

main();