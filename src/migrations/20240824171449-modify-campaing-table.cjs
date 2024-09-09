'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Campaings', 'campaingId'); // Cambia 'campaingId' por el campo que has eliminado
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('Campaings', 'campaingId', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    });
  },
};
