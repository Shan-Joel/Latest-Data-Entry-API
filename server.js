const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

const app = express();
const port = 3000;
const URI = process.env.DB_Connection;

// Middlewares
app.use(bodyParser.json());
app.use(cors());

// Import Routes
const postsRoute = require('./routes/posts'); //In here we are using this as a middleware
app.use('/posts', postsRoute);

// Routes
// Index route
app.use('/', (req, res) => {
   res.send('Index Page');
});

// Connect to DB
mongoose
   .connect(URI)
   .then(() => {
      console.log('DB Connected!');
   })
   .catch((err) => {
      console.log('DB Connection Error', err);
   });

// Listen port
app.listen(port, () => {
   console.log(`Server is running on port ${port}`);
});
