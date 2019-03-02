/* eslint-disable global-require */

require('dotenv').config();
const Hapi = require('hapi');
const Path = require('path');

const server = new Hapi.Server({
    host: 'localhost',
    port: 3010,
});

/* loads db into request.server.app */
server.app.users = require('./lib/db');

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
        require('./lib/routes/get-home'),
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
