const Bell = require('bell');

const register = async (server, options) => {
    /* when seeding fake users, we don't have real github accounts to match
        so in dev, set the variable to use the override function 'simulate()'
    */
    if (process.env.USE_SEED_USERS) {
        Bell.simulate((request) => {
            const seedUser = server.app.users.find(user => user.id === Number(process.env.SEED_USER_ID));
            console.log('seedUser: ', seedUser);
            return {
                provider: 'github',
                query: {},
                token: 'faketoken',
                refreshToken: undefined,
                expiresIn: undefined,
                profile: {
                    id: seedUser.id,
                    username: seedUser.username,
                    displayName: seedUser.name,
                    email: seedUser.email,
                    raw: {
                        avatar_url: seedUser.avatar,
                    },
                },
            };
        });
    }

    await server.register(Bell);

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
