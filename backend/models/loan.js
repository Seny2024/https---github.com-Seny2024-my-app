/* Ce module définit le modèle Loan pour les prêts dans la base de données, 
avec des associations aux modèles User et Book. */


const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Loan = sequelize.define('Loan', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    idUtilisateur: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users', // Nom de la table des utilisateurs
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    idLivre: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Books', // Nom de la table des livres
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    dateEmprunt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    dateRetour: {
      type: DataTypes.DATE,
      allowNull: false
    }
  },
  {
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ['idUtilisateur', 'idLivre']
      }
    ]
  });

  Loan.associate = (models) => {
    Loan.belongsTo(models.User, { foreignKey: 'idUtilisateur', as: 'utilisateur' });
    Loan.belongsTo(models.Book, { foreignKey: 'idLivre', as: 'livre' });
  };

  return Loan;
};
