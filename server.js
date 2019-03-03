/* eslint-disable global-require */

require('dotenv').config();
const Hapi = require('hapi');
const Path = require('path');

const server = new Hapi.Server({
    host: 'localhost',
    port: 3010,
});

/* fake in memory db */
server.app.users = {};

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
