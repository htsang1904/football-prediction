'use strict';

/**
 * task-history service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::task-history.task-history');
