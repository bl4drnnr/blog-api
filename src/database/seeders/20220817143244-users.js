'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          id: '0d0e8c39-275f-4b21-ba0d-1b2a9af1ba4b',
          email: 'jan@kowalki.com',
          password: '',
          username: 'beczka',
          firstName: 'Jan',
          lastName: 'Kowalski',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 'ef53bc07-cafd-418d-a09a-141987250df3',
          email: 'hmmm@john.com',
          password: '',
          username: 'cyborg',
          firstName: 'John',
          lastName: '',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: '79beca3d-20fd-401f-8e26-2832629ca3ec',
          email: 'bruh@test.com',
          password: '',
          username: 'bruh',
          firstName: '',
          lastName: 'Doe',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
    return queryInterface.bulkInsert(
      'UserRoles',
      [
        {
          userId: '0d0e8c39-275f-4b21-ba0d-1b2a9af1ba4b',
          roleId: 'c77a2e92-fef0-47ba-8d8c-14074e0c8971'
        },
        {
          userId: 'ef53bc07-cafd-418d-a09a-141987250df3',
          roleId: 'c77a2e92-fef0-47ba-8d8c-14074e0c8971'
        },
        {
          userId: '79beca3d-20fd-401f-8e26-2832629ca3ec',
          roleId: 'b622c0ee-0ac8-4486-99e2-a9e2384e4c0e'
        }
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Users', null, {});
    return queryInterface.bulkDelete('UserRoles', null, {});
  }
};
