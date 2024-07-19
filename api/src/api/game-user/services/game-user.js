'use strict';

/**
 * game-user service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::game-user.game-user');
