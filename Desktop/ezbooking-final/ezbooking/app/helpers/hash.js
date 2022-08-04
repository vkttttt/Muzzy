var express = require('express');
const crypto = require('crypto');

var hash_helper = {};

/** AES encrypt
 * @apiParam {String} data
 * @apiParam {String} secretKey
 *
 */

hash_helper.aes_encrypt = function(data, secretKey){
    return crypto.AES.encrypt(data, secretKey).toString();
};


/** AES decrypt
 * @apiParam {String} data
 * @apiParam {String} secretKey
 *
 */
hash_helper.aes_decrypt = function(data, secretKey){
    var bytes = crypto.AES.decrypt(data, secretKey);
    return bytes.toString(crypto.enc.Utf8);
};

/** SHA256 encrypt
 * @apiParam {String} data
 * @apiParam {String} disgest
 */
hash_helper.sha256 = function(data, disgest = 'hex'){
    if(disgest != '' && disgest != undefined){
        return crypto.createHash('sha256').update(data).digest(disgest);
    }
    else{
        return crypto.createHash('sha256').update(data).digest('hex');
    }
};

/** MD5 encrypt
 * @apiParam {String} data Thông tin cần mã hóa.
 *
 */
hash_helper.md5 = function(data){
    return crypto.createHash('md5').update(data).digest("hex");
};

/** SHA1 encrypt
 * @apiParam {String} data Thông tin cần mã hóa.
 *
 */
hash_helper.sha1 = function(data){
    return crypto.createHash('sha1').update(data).digest("hex");
};

module.exports = hash_helper;