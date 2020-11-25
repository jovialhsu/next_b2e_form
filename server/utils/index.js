/**
 * @description server tools
 * server 需用 require &  module.exports
 * @returns {object} utils obj
 */

//exports.encrypt = require('./aes').encrypt; //加密
// exports.decrypt = require('./aes').decrypt; //解密
// exports.objRmEmpty = require('./tools').objRmEmpty; //移除物件空白
// exports.arrIsNotEmpty = require('./tools').arrIsNotEmpty; //陣列空白
// exports.filesSize = require('./tools').filesSize; //計算檔案大小
//exports.logger = require('./winston'); //Logger 日誌
exports.axiosHandler = require('./axiosHandler'); //api axiosHandler
