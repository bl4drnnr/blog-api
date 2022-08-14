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
          description: 'Here is some cool description about JS',
          createdAt: new Date('2022-08-13'),
          updatedAt: new Date('2022-08-13')
        },
        {
          id: 'c33530a1-6318-40fb-ab20-4f7adec6d02a',
          title: 'Python and everything you can do with this',
          slug: 'python-and-everything-you-can-do-with-this',
          content: 'Here is some cool content about Python',
          description: 'Here is some cool description about Python',
          createdAt: new Date('2022-08-13'),
          updatedAt: new Date('2022-08-13')
        },
        {
          id: '217c2312-0e39-4be0-b298-386caf16906d',
          title: 'C++ - pros and cons',
          slug: 'c++-pros-and-cons',
          content: 'Here is some cool content about C++',
          description: 'Here is some cool description about C++',
          createdAt: new Date('2022-08-12'),
          updatedAt: new Date('2022-08-12')
        },
        {
          id: '69b0e62c-ecea-4adf-9b95-f75960dc8f16',
          title: 'Lorem-ipsum-dolor-sit-amet-consectetur-adipiscing',
          slug: 'Lorem-ipsum-dolor-sit-amet-consectetur-adipiscing',
          content: 'Here is some cool content about lorem',
          description: 'Here is some cool description about lorem',
          createdAt: new Date('2022-08-11'),
          updatedAt: new Date('2022-08-11')
        },
        {
          id: 'f08532ac-2387-463a-a8f0-f4d58f6c6a55',
          title: 'sed eget suscipit turpis praesent et tristique',
          slug: 'sed-eget-suscipit-turpis-praesent-et-tristique',
          content: 'Here is some cool content about sed',
          description: 'Here is some cool description about sed',
          createdAt: new Date('2022-08-10'),
          updatedAt: new Date('2022-08-10')
        },
        {
          id: '03a8e084-3769-4e10-a3f8-accbe9158714',
          title: 'tellus orci ac auctor augue',
          slug: 'tellus-orci-ac-auctor-augue',
          content: 'Here is some cool content about tellus',
          description: 'Here is some cool description about tellus',
          createdAt: new Date('2022-08-09'),
          updatedAt: new Date('2022-08-09')
        },
        {
          id: '7b74ef3c-7032-47af-be71-89ea4598f839',
          title: 'nibh sed pulvinar proin gravida',
          slug: 'nibh-sed-pulvinar-proin-gravida',
          content: 'Here is some cool content about nibh',
          description: 'Here is some cool description about nibh',
          createdAt: new Date('2022-08-08'),
          updatedAt: new Date('2022-08-08')
        },
        {
          id: '65151926-eeec-4051-8cc5-e4e7d091677a',
          title: 'sapien nec sagittis aliquam malesuada',
          slug: 'sapien-nec-sagittis-aliquam-malesuada',
          content: 'Here is some cool content about sapien',
          description: 'Here is some cool description about sapien',
          createdAt: new Date('2022-08-08'),
          updatedAt: new Date('2022-08-08')
        },
        {
          id: 'f9471185-d7dd-41a9-881d-8ac91a2478ad',
          title: 'turpis egestas maecenas pharetra convallis',
          slug: 'turpis-egestas-maecenas-pharetra-convallis',
          content: 'Here is some cool content about turpis',
          description: 'Here is some cool description about turpis',
          createdAt: new Date('2022-08-07'),
          updatedAt: new Date('2022-08-07')
        },
        {
          id: 'bc52c54a-5e5c-46c4-94e4-4c78d5d89fd3',
          title: 'lacus sed viverra tellus in',
          slug: 'lacus-sed-viverra-tellus-in',
          content: 'Here is some cool content about lacus',
          description: 'Here is some cool description about lacus',
          createdAt: new Date('2022-08-07'),
          updatedAt: new Date('2022-08-07')
        },
        {
          id: 'fe9adb3d-9c95-4ceb-8063-86af91217797',
          title: 'faucibus a pellentesque sit amet',
          slug: 'faucibus-a-pellentesque-sit-amet',
          content: 'Here is some cool content about faucibus a pellentesque',
          description: 'Here is some cool description about pellentesque',
          createdAt: new Date('2022-08-07'),
          updatedAt: new Date('2022-08-07')
        },
        {
          id: 'a26b8738-5899-4423-8515-f2741a964c5b',
          title: 'nibh tortor id aliquet lectus',
          slug: 'nibh-tortor-id-aliquet-lectus',
          content: 'Here is some cool content about nibh tortor',
          description: 'Here is some cool description about tortor',
          createdAt: new Date('2022-08-07'),
          updatedAt: new Date('2022-08-07')
        },
        {
          id: 'a0ef39c7-18f3-47e9-8481-0adea8f9ed8a',
          title: 'in fermentum et sollicitudin ac',
          slug: 'in-fermentum-et-sollicitudin-ac',
          content: 'Here is some cool content about in fermentum',
          description: 'Here is some cool description about fermentum',
          createdAt: new Date('2022-08-07'),
          updatedAt: new Date('2022-08-07')
        }
      ],
      {}
    );
  },

  async down(queryInterface) {
    return await queryInterface.bulkDelete('Posts', null, {});
  }
};
