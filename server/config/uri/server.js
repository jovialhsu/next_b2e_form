/**
 * server use api uri
 */
const config = require('../../config');
// console.log(config);
//DEV endpoint & docker container TEST/WS/PRD endpoint
//const MEMBER = `${config.memPlayScheme}://member.eztravel.com.tw/`;
const MEMBER_API =
    config.env === 'DEV'
        ? 'http://mem00t-w01.eztravel.com.tw:8080/'
        : 'http://member-api.eztravel.com.tw:8080/';
const MAIN_WEB_API =
    config.env === 'DEV'
        ? 'http://hpapi-t01.eztravel.com.tw/'
        : 'http://hpapi.eztravel.com.tw/';

exports.mainWebApi = {
    header: `${MAIN_WEB_API}v1/api/ezSpHeader`,
    footer: `${MAIN_WEB_API}v1/api/ezSpFooter`,
    EzJsCss: `${MAIN_WEB_API}v3/api/ezSpJsCss`,
};
exports.b2eApi = {
    //member: `${MEMBER_API}member/rest/v1/b2e/registryB2eMain`,
    // member: `${MEMBER_API}member/rest/v1/b2e/registryB2e`,
    member: 'http://localhost:3004/member',
};
