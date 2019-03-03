module.exports = {
    method: 'GET',
    path: '/users/{username}',
    options: {
        auth: {
            strategy: 'session',
            mode: 'try',
        },
        handler: (request, h) => {
            // when anyone tries to visit a non-existant users page, nothing to do with auth
            const user = request.server.app.users[request.params.username];
            if (!user) {
                return h.redirect('/');
            }
            console.log('request.auth on profile: ', request.auth);
            const context = {
                name: user.name,
                username: user.username,
                avatar: user.avatar,
                isUser: false,
            };

            if (request.auth.isAuthenticated && request.auth.credentials.username === request.params.username) {
                context.isUser = true;
            }

            return h.view('profile', context);
        },
    },
};
