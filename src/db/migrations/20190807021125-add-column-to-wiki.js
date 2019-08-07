'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      "Wikis",
      "collaboratorId",
      {
        type: Sequelize.INTEGER,
        references:  {
          model: "Collaborators",
          key: "userId",
          as: "collaboratorId"
        }
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn( 'Wikis', 'collaboratorId');
  }
};
