'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Tags', [{
      postId: 1,
      comment:
        "Test Tag",
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
