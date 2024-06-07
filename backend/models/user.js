/* 
Ce fichier définit le modèle User pour Sequelize, incluant la validation des emails, 
le hachage des mots de passe avant la création et la mise à jour des utilisateurs, et la méthode pour 
vérifier les mots de passe.
*/


const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nom: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    motDePasse: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'utilisateur',
      validate: {
        isIn: [['utilisateur', 'administrateur']]
      }
    }
  }, {
    timestamps: false,
    hooks: {
      beforeCreate: async (user) => {
        if (user.motDePasse) {
          const salt = await bcrypt.genSalt(10);
          user.motDePasse = await bcrypt.hash(user.motDePasse, salt);
        }
      },
      beforeUpdate: async (user) => {
        if (user.motDePasse) {
          const salt = await bcrypt.genSalt(10);
          user.motDePasse = await bcrypt.hash(user.motDePasse, salt);
        }
      }
    }
  });

  User.prototype.validPassword = async function(password) {
    return await bcrypt.compare(password, this.motDePasse);
  };

  return User;
};
