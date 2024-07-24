module.exports = {
    routes: [
        {
            method: 'GET',
            path: '/task/get-tasks',
            handler: 'task.getTasks',
        }
    ]
}