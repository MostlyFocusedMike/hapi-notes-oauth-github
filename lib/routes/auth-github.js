module.exports = {
    method: 'GET',
    path: '/auth/github',
    options: {
        auth: 'github',
        handler: (request, h) => {
            if (request.auth.isAuthenticated) {
                const user = request.auth.credentials.profile;
                const data = {
                    name: user.displayName,
                    username: user.username,
                    avatar: user.raw.avatar_url,
                };

                return h.view('authenticated', data);
            }

            return h.view('index', {
                err: 'Could not authenticate with GitHub.',
            }).code(400);
        },
    },
};