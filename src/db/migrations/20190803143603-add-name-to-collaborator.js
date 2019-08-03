'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
    "Collaborators",
    "nameId",
    {
      type: Sequelize.STRING,
      allowNull: false,
      references:  {
        model: "Users",
        key: "id",
        as: "nameId"
      }
    }
  );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn( 'Collaborators', 'nameId');
  }
};
