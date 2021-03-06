'use strict';
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
module.exports = {

  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('Users', [{
        id:uuidv4(),
        name: 'Owen Coogan',
        email: 'oc@gmail.com',
        role:'super-admin',
        password: await bcrypt.hash('IamTheWalrus', 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      }], {});
  },

  async down (queryInterface, Sequelize) {
  }
};
