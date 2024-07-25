'use strict';

/**
 * task-history controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::task-history.task-history', ({strapi}) => ({
    getTasksHis(ctx) {
        const data = ctx.request.body
        let hisList = strapi.entityService.findMany('api::task-history.task-history', {
            filters: { game_user: data.id, task: data.task_id },
            populate: '*'
        })
        return hisList
    },
    async createHisLog(ctx) {
        const data = ctx.request.body
        let createLog = await strapi.entityService.create('api::task-history.task-history', {
            data: {
                task: data.task_id,
                isCompleted: true,
                game_user: data.user_id
            },
        })
        return createLog
    }
}));
