const express = require('express');
const mongoose = require('mongoose');
var cors = require('cors')
const app = express()

const port = process.env.PORT || 3001;

require('dotenv').config();
const mongoString = process.env.AZURE_COSMOS_CONNECTIONSTRING
console.log(mongoString)

mongoose.connect(mongoString);
const database = mongoose.connection

database.on('error', (error) => {
  console.log(error)
})

database.once('connected', () => {
  console.log('Database Connected');
})

const routes = require('./routes/routes');

app.use(express.json());
app.use(cors())
app.use('/api', routes)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})