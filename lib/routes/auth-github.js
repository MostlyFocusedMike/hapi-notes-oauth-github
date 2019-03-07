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
                    email: user.email,
                };

                // fake a create user action by loading data into memory
                if (!request.server.app.users[user.username]) {
                    request.server.app.users[user.username] = data;
                }

                console.log('request.auth ', request.auth);
                request.cookieAuth.set({ username: user.username });
                return h.redirect(`/users/${user.username}`);
            }

            return h.view('index', {
                err: 'Could not authenticate with GitHub.',
            }).code(400);
        },
    },
};
