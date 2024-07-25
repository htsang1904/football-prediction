'use strict';

/**
 * task controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::task.task', ({strapi}) => ({
    async getTasks() {
        const taskList = await strapi.entityService.findMany('api::task.task')
        return taskList
    }
}));
