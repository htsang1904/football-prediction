
module.exports = {
    routes: [
        {
            method: 'POST',
            path: '/task-history/get-his',
            handler: 'task-history.getTasksHis',
        },
        {
            method: 'POST',
            path: '/task-history/new-request',
            handler: 'task-history.createHisLog'
        },
        {
            method: 'POST',
            path: '/task-history/get-ticket',
            handler: 'task-history.getTicket'
        }
    ]
}