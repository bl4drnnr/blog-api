'use strict';

module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert(
      'Roles',
      [
        {
          id: 'c77a2e92-fef0-47ba-8d8c-14074e0c8971',
          value: 'USER',
          description: 'Common user',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 'b622c0ee-0ac8-4486-99e2-a9e2384e4c0e',
          value: 'ADMIN',
          description: 'Administrator',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('Roles', null, {});
  }
};
