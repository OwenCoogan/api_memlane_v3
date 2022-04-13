'use strict';
const bcrypt = require('bcrypt');
module.exports = {

  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('Users', [{
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: await bcrypt.hash('IamTheWalrus', 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      }], {});
  },

  async down (queryInterface, Sequelize) {
  }
};
