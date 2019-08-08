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


    // Wiki.belongsToMany(models.User, {              // <--- what I just added 
    //   as: "collaborators",
    //   through: "Collaborators"
    // });

     // Wiki.belongsTo(models.Collaborator, {
    //   foreignKey: "collaboratorId",
    //   onDelete: "CASCADE"
    // });

  };

  Wiki.prototype.getCollaboratorsFor = function(wikiId){
    return this.collaborators.find((collaborator) => {
      return collaborator.wikiId == wikiId;
    });
  };


  return Wiki;
};