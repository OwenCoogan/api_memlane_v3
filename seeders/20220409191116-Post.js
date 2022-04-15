'use strict';
const { User } = require('../models');

module.exports = {
  async up (queryInterface, Sequelize) {
    const author = await User.findOne();
    await queryInterface.bulkInsert('Posts', [{
      userId: author.id,
      title: 'some dummy title',
      latitude: 48.858093,
      longitude: 2.294694,
      content:
        "Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque. Quisque porta volutpat erat.",
      createdAt: new Date(),
      updatedAt: new Date()
     }], {});
 },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
