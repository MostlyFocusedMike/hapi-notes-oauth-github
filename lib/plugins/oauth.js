const bell = require('bell');

const register = async (server, options) => {
    // declare and install dependency to bell
    await server.register(bell);

    /**
     * * Register 'github' authentication strategy
     */
    server.auth.strategy('github', 'bell', {
        provider: 'github',
        password: process.env.OAUTH_PSWD,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        isSecure: process.env.NODE_ENV === 'production',
    });

    server.log('info', 'Plugin registered: bell authentication with strategy »github«');
};

exports.plugin = {
    register,
    name: 'oauth',
    version: '1.0.0',
    once: true,
};
