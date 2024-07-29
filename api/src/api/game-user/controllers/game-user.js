'use strict';

/**
 * game-user controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::game-user.game-user', ({strapi}) => ({
    async registerUser(ctx) {
        let userData = ctx.request.body;
        let user = await strapi.entityService.create('api::game-user.game-user', {
            data: {
            user_id: userData.user_id,
            phoneNumber: userData.user_phone,
            name: userData.user_name,
            total_coins: 0,
            total_tickets: 0,
            }
        })
        return {
            success: true,
            data: user
        }
    },
    async loginUser(ctx) {
        let userData = ctx.request.body;
        let user = await strapi.entityService.findMany('api::game-user.game-user', {
            filters: { user_id: userData.user_id, phoneNumber: userData.user_phone },
            populate: '*'
        });
        if (user.length > 0) {
            return {
            success: true,
            data: user[0]
            }
        } else {
            return {
            success: false
            };
        }
    },
    async updateTickets(ctx) {
        let data = ctx.request.body
        let update = await strapi.entityService.update('api::game-user.game-user', data.user_id, {
            data: {
                total_tickets: data.total_tickets
            },
        })
        return update
    },
    async updateCoins(ctx) {
        let data = ctx.request.body
        let update = await strapi.entityService.update('api::game-user.game-user', data.user_id, {
            data: {
                total_coins: data.total_coins
            }
        })
        return update
    }
}));
