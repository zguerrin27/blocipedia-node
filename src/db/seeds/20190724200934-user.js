'use strict';

const faker = require("faker");

let fakeUsers = [];

for(let i = 1 ; i <= 10 ; i++){
  fakeUsers.push({
    username: faker.name.findName(),
    email: faker.internet.email(),
    password: "password",
    createdAt: new Date(),
    updatedAt: new Date()
  });
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', fakeUsers, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
