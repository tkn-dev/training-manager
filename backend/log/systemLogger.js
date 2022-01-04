const log4js = require('log4js');
const logConfig = require('./log4js_config.json');

log4js.configure(logConfig);
const logger = log4js.getLogger('system');
logger.level = 'ALL';

module.exports = logger;
