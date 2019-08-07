'use strict';
module.exports = (sequelize, DataTypes) => {
  const Wiki = sequelize.define('Wiki', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false
    },
    private: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    collaboratorId: {
      type: DataTypes.INTEGER
    }
  }, {});
  Wiki.associate = function(models) {

    Wiki.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE"
    });

    Wiki.hasMany(models.Collaborator, {
      foreignKey: "wikiId",
      as: "collaborators"
    });

     // Wiki.belongsTo(models.Collaborator, {
    //   foreignKey: "collaboratorId",
    //   onDelete: "CASCADE"
    // });

  };
  return Wiki;
};