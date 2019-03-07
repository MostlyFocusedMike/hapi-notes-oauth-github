const hapiAuthCookie = require('hapi-auth-cookie');

const register = async (server, options) => {
    await server.register(hapiAuthCookie);

    server.auth.strategy('session', 'cookie', {
        password: process.env.COOKIE_PSWD, // needed for cookie encoding
        isSecure: process.env.NODE_ENV === 'production', // send over http in local
        redirectTo: '/', // redirect of failed login
        cookie: 'session', // name of the cookie

        validateFunc: async (request, session) => {
            /* validate the existing session on every request */
            console.log('session from validateFunc: ', session);
            const user = request.server.app.users[session.username];
            if (!user) return { valid: false };
            return { valid: true }; // can also send credentials property
        },
    });
};

exports.plugin = {
    register,
    name: 'session',
    version: '1.0.0',
    once: true,
};
