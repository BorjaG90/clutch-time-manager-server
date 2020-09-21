'use strict'

require('dotenv').config();
const express = require('express');

let app = express();

let port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log(`ClutchTime Manager server listening in port: ${port}`);
});
