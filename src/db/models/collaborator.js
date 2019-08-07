'use strict';
module.exports = (sequelize, DataTypes) => {
  const Collaborator = sequelize.define('Collaborator', {
    wikiId: {
      type: DataTypes.INTEGER,
      onDelete: "CASCADE",
      allowNull: false,
      references: {
        model: "Wikis",
        key: "id",
        as: "wikiId"
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      onDelete: "CASCADE",
      allowNull: false,
      references:  {
        model: "Users",
        key: "id",
        as: "userId"
      }
    }
  }, {});
  Collaborator.associate = function(models) {
   
    Collaborator.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE"
    });

    Collaborator.belongsTo(models.Wiki, {
      foreignKey: "wikiId",
      onDelete: "CASCADE"
    });

    // Collaborator.hasMany(models.Wiki, {
    //   foreignKey: "wikiId",
    //   as: "collaborators"
    // });


  };

  Collaborator.addScope('collaboratorsFor', (wikiId) => {
    return {
      include: [
        { model: models.User }
      ],
      where: { wikiId: wikiId },
      order: [['createdAt', 'ASC']]
    }
  });


  return Collaborator;
};