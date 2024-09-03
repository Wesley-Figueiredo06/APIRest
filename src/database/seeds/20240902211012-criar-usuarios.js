const bcryptjs = require('bcryptjs');

module.exports = {
    up: async (queryInterface) => {
        queryInterface.bulkInsert('users', [
            {
                nome: 'Luiz',
                email: 'Luiz@gmail.com',
                password_hash: await bcryptjs.hash('123456', 8),
                created_at: new Date(),
                updated_at: new Date(),
            }, {
                nome: 'Luiz 1',
                email: 'Luiz1@gmail.com',
                password_hash: await bcryptjs.hash('asdasda', 8),
                created_at: new Date(),
                updated_at: new Date(),
            }, {
                nome: 'Luiz 2',
                email: 'Luiz2@gmail.com',
                password_hash: await bcryptjs.hash('a11482354', 8),
                created_at: new Date(),
                updated_at: new Date(),
            },

        ], {},);
    },




    down: () => {
    }
}

