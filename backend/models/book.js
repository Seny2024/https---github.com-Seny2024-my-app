// Définition du modèle Book pour la table des livres dans la base de données avec Sequelize.
// Ce modèle inclut les champs id, titre, auteur, anneePublication, genre, resume et disponible.
// Les champs titre et auteur doivent être uniques en combinaison.
// Les timestamps sont désactivés pour ce modèle.

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Book = sequelize.define('Book', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    titre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    auteur: {
      type: DataTypes.STRING,
      allowNull: false
    },
    anneePublication: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        min: 0
      }
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    resume: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    disponible: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    
  },
  {
    timestamps: false, // Désactiver les timestamps
    indexes: [
      {
        unique: true,
        fields: ['titre', 'auteur']
      }
    ]
    
  });

  return Book;
};
