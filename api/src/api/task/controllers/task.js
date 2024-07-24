'use strict';

/**
 * task controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::task.task', ({strapi}) => ({
    getTasks(ctx) {
        const taskList = strapi.entityService.findMany('api::task.task')
        return taskList
    }
}));
