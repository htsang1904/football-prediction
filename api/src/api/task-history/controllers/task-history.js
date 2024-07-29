'use strict';

/**
 * task-history controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const moment = require('moment')
require('moment/locale/vi')
module.exports = createCoreController('api::task-history.task-history', ({strapi}) => ({
    async getTasksHis(ctx) {
        const data = ctx.request.body
        let hisList = await strapi.entityService.findMany('api::task-history.task-history', {
            filters: { game_user: data.user_id},
            populate: '*'
        })
        let dailyTaskHis = []
        let weeklyTaskHis = []
        if(hisList.length) {
            dailyTaskHis = hisList.filter(e => e.task.type == 'daily' && moment(e.createdAt).isSame(moment(), 'day'))
            weeklyTaskHis = hisList.filter(e => e.task.type == 'weekly' && moment(e.createdAt).isSame(moment(), 'week'))
        }
        return {
            dailyTask: dailyTaskHis,
            weeklyTask: weeklyTaskHis
        }
    },
    async createHisLog(ctx) {
        const data = ctx.request.body
        let listTaskHis = await strapi.entityService.findMany('api::task-history.task-history', {
            filters: { task: data.task_id, game_user: data.user_id },
            populate: '*'
        })
        let currentTask = await strapi.entityService.findOne('api::task.task', data.task_id);
        let quantityTask = currentTask.quantity
        let typeTask = currentTask.type
        let checkTask = null
        if(typeTask == 'daily') {
            checkTask = listTaskHis.filter(e => {
                return moment(e.createdAt).isSame(moment(), 'day')
            })
        } else {
            checkTask = listTaskHis.filter(e => {
                return moment(e.createdAt).isSame(moment(), 'week')
            })
        }
        if(checkTask.length < quantityTask) {
            let createLog = await strapi.entityService.create('api::task-history.task-history', {
                data: {
                    task: data.task_id,
                    isCompleted: false,
                    game_user: data.user_id
                },
            })
            return createLog
        }
        return {
            success: false
        }
    },
    async getTicket(ctx) {
        const data = ctx.request.body
        let count = 0
        let listTaskHis = []
        listTaskHis = await strapi.entityService.findMany('api::task-history.task-history', {
            filters: { task: data.task_id, game_user: data.user_id },
        })
        if(listTaskHis.length) {
            const updateHis = listTaskHis.map(e => {
                if(!e.isCompleted) {
                    strapi.entityService.update('api::task-history.task-history', e.id, {
                        data: {
                            isCompleted: true
                        },
                    })
                    count++
                }
            }
            );
            await Promise.all(updateHis);
            if(count > 0) {
                return {
                    success: true,
                    count: count
                }
            } else {
                return {
                    success: false
                }
            }
        }
        return {
            success: false
        }
    }
}));
