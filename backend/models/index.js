// backend/models/index.js

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

// Initialisation de Sequelize avec les configurations appropriées
let sequelize;
if (config.use_env_variable) {
  // Si une variable d'environnement est définie pour la base de données
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  // Sinon, utiliser les informations de configuration définies dans le fichier config.js
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Lecture des fichiers de modèles dans le répertoire courant
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    // Importation de chaque modèle trouvé
    const model = require(path.join(__dirname, file));
    if (typeof model === 'function') {
      db[model(sequelize, Sequelize.DataTypes).name] = model(sequelize, Sequelize.DataTypes);
    }
  });

// Configuration des associations entre les modèles
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Ajout de Sequelize et de l'instance sequelize à l'objet db
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
