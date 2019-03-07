const bell = require('bell');

const register = async (server, options) => {
    await server.register(bell);

    server.auth.strategy('github', 'bell', {
        provider: 'github', // this is the OAuth provider
        password: process.env.OAUTH_PSWD, // for cookie encryption
        clientId: process.env.CLIENT_ID, // from the GitHub application
        clientSecret: process.env.CLIENT_SECRET, // from the GitHub application
        isSecure: process.env.NODE_ENV === 'production', // send over http in local
    });
};

exports.plugin = {
    register,
    name: 'oauth',
    version: '1.0.0',
    once: true,
};
