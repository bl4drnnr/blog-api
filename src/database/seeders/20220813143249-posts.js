'use strict';

module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert(
      'Posts',
      [
        {
          id: '5d79b8b1-f677-47af-8bcb-958987711965',
          title: 'How JS is running the world',
          slug: 'how-js-is-running-the-world',
          content: 'Here is some cool content about JS',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 'c33530a1-6318-40fb-ab20-4f7adec6d02a',
          title: 'Python and everything you can do with this',
          slug: 'python-and-everything-you-can-do-with-this',
          content: 'Here is some cool content about Python',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: '217c2312-0e39-4be0-b298-386caf16906d',
          title: 'C++ - pros and cons',
          slug: 'c++-pros-and-cons',
          content: 'Here is some cool content about C++',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  async down(queryInterface) {
    return await queryInterface.bulkDelete('Posts', null, {});
  }
};
