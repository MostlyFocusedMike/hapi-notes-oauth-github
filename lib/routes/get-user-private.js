module.exports = {
    method: 'GET',
    path: '/users/{username}/private',
    options: {
        auth: {
            strategy: 'session',
        },
        handler: (request, h) => {
            // when anyone tries to visit a non-existant users page, nothing to do with auth
            const user = request.server.app.users[request.params.username];
            if (!user) {
                return h.redirect('/');
            }
            console.log('request.auth on profile: ', request.auth);

            return `this is just for you ${user.name}`;
        },
    },
};
