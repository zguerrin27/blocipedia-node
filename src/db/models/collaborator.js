'use strict';
module.exports = (sequelize, DataTypes) => {
  const Collaborator = sequelize.define('Collaborator', {
    wikiId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  Collaborator.associate = function(models) {
    // associations can be defined here
  };
  return Collaborator;
};