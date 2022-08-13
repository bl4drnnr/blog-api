'use strict';

module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert(
      'Posts',
      [
        {
          title: 'How JS is running the world',
          slug: 'how-js-is-running-the-world',
          content: 'Here is some cool content'
        },
        {
          title: 'Python and everything you can do with this',
          slug: 'python-and-everything-you-can-do-with-this',
          content: 'Here is some cool content'
        },
        {
          title: 'C++ - pros and cons',
          slug: 'c++-pros-and-cons',
          content: 'Here is some cool content'
        }
      ],
      {}
    );
  },

  async down(queryInterface) {
    return await queryInterface.bulkDelete('Posts', null, {});
  }
};
