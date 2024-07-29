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
        },
        {
            method: 'POST',
            path: '/game-user/update-tickets',
            handler: 'game-user.updateTickets',
        },
        {
            method: 'POST',
            path: '/game-user/update-coins',
            handler: 'game-user.updateCoins',
        }
    ]
}