module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameTable('Campaings', 'campaings');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameTable('campaings', 'Campaings');
  }
};
