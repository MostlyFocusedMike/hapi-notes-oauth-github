/* eslint-disable global-require */

require('dotenv').config();
const Hapi = require('hapi');
const Path = require('path');

const server = new Hapi.Server({
    host: 'localhost',
    port: 3010,
});

/* fake in memory db from pretend seeding */
server.app.users = [
    {
        id: 1,
        name: 'Fake User',
        username: 'fake_usr',
        avatar: 'https://www.catster.com/wp-content/uploads/2015/06/6becb852b27e1d80fbd03048dfb377a5_1273011771.jpg',
        email: 'fake@gmail.com',
    },
    {
        id: 2,
        name: 'Not Real',
        username: 'nonononoreal',
        avatar: 'https://www.petbucket.com/resources/18/160536/picture/2F/85854511.jpg',
        email: 'noreal@gmail.com',
    },
];

const start = async () => {
    await server.register([
        require('vision'),
        require('./lib/plugins/oauth'),
        require('./lib/plugins/session'),
    ]);

    server.views({
        engines: {
            html: {
                module: require('handlebars'),
                layout: true,
            },
        },
        relativeTo: Path.join(__dirname, 'lib/templates'),
        path: '.',
        isCached: process.env.NODE_ENV === 'production',
        defaultExtension: 'html',
    });


    // routes
    server.route([
        require('./lib/routes/auth-github'),
        require('./lib/routes/get-home'),
        require('./lib/routes/get-user'),
        require('./lib/routes/get-user-private'),
        require('./lib/routes/post-logout'),
    ]);

    try {
        await server.start();
        console.log(`Server is up on: ${server.info.uri}`);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

start();
