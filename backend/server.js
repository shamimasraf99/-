require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require("./src/models");
const seedDatabase = require('./src/db/seed');

const app = express();

// CORS configuration to allow requests from the frontend
const corsOptions = {
  origin: '*' // In production, restrict this to your frontend's domain
};

app.use(cors(corsOptions));

// Parse requests of content-type - application/json
app.use(express.json());

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Connect to Database and seed
db.sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    // In a real app, you might want a more robust seeding strategy.
    // For this project, we'll sync and seed on startup.
    // Use { force: true } in development to drop and re-sync db.
    db.sequelize.sync().then(() => {
        console.log("Database synchronized.");
        seedDatabase();
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


// Simple route for testing
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Bangla ERP Backend API.' });
});

// API Routes
require('./src/routes/auth.routes')(app);
require('./src/routes/user.routes')(app);
require('./src/routes/project.routes')(app);
require('./src/routes/crm.routes')(app);
require('./src/routes/inventory.routes')(app);


// Set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
