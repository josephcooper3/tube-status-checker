const express = require('express');
const app = express();
const fetch = require('node-fetch');

const cors = require("cors");
app.use(cors());

const dotenv = require('dotenv');
dotenv.config();
const appId = process.env.APP_ID;
const appKey = process.env.APP_KEY;
const port = process.env.PORT;

app.get('/', async function (req, res) {
  fetch(`https://api.tfl.gov.uk/Line/Mode/tube/Status?detail=true&app_id=${ appId }&app_key=${ appKey }`)
  .then(result => result.json())
  .then(statusDetails => res.json(statusDetails))
  .catch(console.error);      
});

app.listen(3000, function () {
  console.log(`App running on port ${ port }`);
});