'use strict';

/**
 * reward controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::reward.reward', ({strapi}) => ({
    async getRewardList() {
        const rewardList = await strapi.entityService.findMany('api::reward.reward')
        return rewardList
    }
}));
