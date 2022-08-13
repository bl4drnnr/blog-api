'use strict';

module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert(
      'Roles',
      [
        {
          value: 'USER',
          description: 'Common user'
        },
        {
          value: 'ADMIN',
          description: 'Administrator'
        }
      ],
      {}
    );
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('Roles', null, {});
  }
};
