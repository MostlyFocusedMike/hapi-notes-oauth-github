const hapiAuthCookie = require('hapi-auth-cookie');

const register = async (server, options) => {
    await server.register(hapiAuthCookie);

    server.auth.strategy('session', 'cookie', {
        password: process.env.COOKIE_PSWD, // needed for cookie encoding
        isSecure: process.env.NODE_ENV === 'production', // send over http in local
        redirectTo: '/', // redirect of failed login
        appendNext: true, // remembers where you were before failing auth

        validateFunc: async (request, session) => {
            /* validate the existing session on every request */
            const user = request.server.app.users[session.username];
            if (!user) {
                return { valid: false };
            }

            return { valid: true, credentials: user };
        },
    });

    server.log('info', 'Plugin registered: cookie authentication with strategy »session«');
};

exports.plugin = {
    register,
    name: 'sessions',
    version: '1.0.0',
    once: true,
};
