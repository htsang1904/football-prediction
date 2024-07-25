module.exports = {
    routes: [
        {
            method: 'POST',
            path: '/game-user/login',
            handler: 'game-user.loginUser',
        },
        {
            method: 'POST',
            path: '/game-user/register',
            handler: 'game-user.registerUser',
        }
    ]
}