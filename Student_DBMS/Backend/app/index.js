const express = require('express');
const cors = require('cors');
const path = require('path');

require('dotenv').config();

const routes = require('./routes/routes');

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());

// parse requests of content-type: application/json
app.use(express.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
if (process.env.NODE_ENV === 'development')
  app.get('/', (req, res) => {
    res.json({
      success: true,
      message: 'Welcome to university application. Please specify path.'
    });
  });

// will set all routes
routes.register(app);

// wrong route
if (process.env.NODE_ENV === 'development')
  app.get('*', (req, res) => {
    res.json({
      success: false,
      message: 'This table does not exist in database.'
    });
  });

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '..', 'build')));

  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html')));
}

// set port, listen for requests
app.listen(PORT, () => {
  console.log('Server is running on port ' + `${PORT}`);
});
