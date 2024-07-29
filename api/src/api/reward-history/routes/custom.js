
module.exports = {
    routes: [
        {
            method: 'POST',
            path: '/reward-history/new-request',
            handler: 'reward-history.createHisLog',
        },
        {
            method: 'POST',
            path: '/reward-history/get-reward-his',
            handler: 'reward-history.getRewardHis',
        }
    ]
}