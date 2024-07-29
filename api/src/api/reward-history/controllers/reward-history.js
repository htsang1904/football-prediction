'use strict';

/**
 * reward-history controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const moment = require('moment')

module.exports = createCoreController('api::reward-history.reward-history', ({strapi}) => ({
    async getRewardHis(ctx) {
        let data = ctx.request.body
        let rewardHisList = await strapi.entityService.findMany('api::reward-history.reward-history', {
            filters: { game_user: data.user_id},
            populate: '*'
        })
        return rewardHisList
    },
    async createHisLog(ctx) {
        let data = ctx.request.body
        let createLog = await strapi.entityService.create('api::reward-history.reward-history', {
            data: {
                reward: data.reward_id,
                received_time: moment().format('hh:mm DD/MM/YYYY'),
                game_user: data.user_id
            },
        })
        return createLog
    }
}));
