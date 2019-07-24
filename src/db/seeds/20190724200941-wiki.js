'use strict';

const faker = require("faker");

let fakeWikis = [];

for(let i = 1 ; i <= 10 ; i++){
  fakeWikis.push({
    title: faker.hacker.noun(),
    body: faker.hacker.phrase(),
    private: false,
    userId: i + 1,
    createdAt: new Date(),
    updatedAt: new Date()
  });
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Wikis', fakeWikis, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Wikis', null, {});
  }
};
