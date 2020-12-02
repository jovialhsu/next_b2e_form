/**
 * server use api uri
 */
const config = require('../../config');
//DEV endpoint & docker container TEST/WS/PRD endpoint
const MEMBER = `${config.memPlayScheme}://member.eztravel.com.tw/`;
const MEMBER_API =
    config.env === 'DEV' ? 'http://member-api:8080/' : 'http://member-api/';
const MAIN_WEB_API =
    config.env === 'DEV'
        ? 'http://hpapi-t01.eztravel.com.tw/'
        : 'http://hpapi.eztravel.com.tw/';

exports.mainWebApi = {
    header: `${MAIN_WEB_API}v1/api/ezSpHeader`,
    footer: `${MAIN_WEB_API}v1/api/ezSpFooter`,
    ezJsCss: `${MAIN_WEB_API}v2/api/ezSpJsCss`,
};
