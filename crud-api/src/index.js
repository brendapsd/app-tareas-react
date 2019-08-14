const rapify = require('rapify');
const cors = require('cors');

rapify.bootstrap({
    onStart: () => console.log('API server ready...'),
    port: 4000,
    bodyParser: true,
    middleware: [
        cors()
    ],
    controllers: [
        {
            prefix: '/todo',
            crudInterface: rapify.crudInterfaces.memory(),
            restify: {
                create: true,
                read: true,
                update: true,
                delete: true,
                paginate: true,
            },
        }
    ],
});