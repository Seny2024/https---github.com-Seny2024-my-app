// backend/server.js

require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sequelize } = require('./models'); 
const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');
const loanRoutes = require('./routes/loanRoutes');
const { seedUsers, seedLoans, seedAll } = require('./seeders/seed'); 
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/loans', loanRoutes);

const PORT = process.env.PORT || 5000;

// Synchronisation des modèles avec la base de données et seeding des utilisateurs
sequelize.sync({ force: false }).then(async () => {
  console.log("Tables synchronisées");
  // Appel des fonctions de seeding
  await seedUsers();
  await seedLoans();
  await seedAll();
  // Démarrage du serveur une fois que le seeding est terminé
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(error => {
  console.error('Unable to sync the database:', error);
});
