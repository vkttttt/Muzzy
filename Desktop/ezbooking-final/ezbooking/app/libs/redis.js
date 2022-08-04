var express = require("express");
var redis = require('redis');
var appRedis = express();

/* 
Redis SET value into key
- SET KEY VALUE [EX seconds|PX milliseconds] [NX|XX|null]
*/
appRedis.set = function(key, value, expire = 3600){
    //create client
    var redisClient = redis.createClient(appConfig.redis.port, appConfig.redis.host);
    //catch error
    redisClient.on('error',function(err){
        console.log('redisSet',err);
        redisClient.quit();
    });

    redisClient.on('ready', function(){
        redisClient.del(key, function(err){
            if(err){
                console.log('redisSet',err);
                redisClient.quit();
            } 
            redisClient.set(key,value,'EX',expire,function(err,reply){
                redisClient.quit();
                if(err) console.log('redisSet',err);
            });                                    
        }); 
    });    
};

/*
 Redis GET key
 - GET KEY
 - return value | null
 */
appRedis.get = function(key){
    return new Promise(function (resolve, reject) {
        var redisClient = redis.createClient(appConfig.redis.port, appConfig.redis.host);
        redisClient.on('ready', function(){
            redisClient.get(key, function(err, reply) {
                redisClient.quit();
                if(err){
                    console.log('redisError1',err);
                    resolve(false);
                } else {
                    resolve(reply);
                }
            });
        });

        redisClient.on('error', function(err, response){
            redisClient.quit();
            console.log('redisError2',err);
            resolve(false);
        });
    });
};

/*
 Redis GET key
 - GET KEY
 - return value | null
 */
appRedis.get_list = function(key){
    return new Promise(function (resolve, reject) {
        var redisClient = redis.createClient(appConfig.redis.port, appConfig.redis.host);
        redisClient.on('ready', function(){
            redisClient.lrange(key,0,-1, function(err, reply) {
                redisClient.quit();
                if(err){
                    console.log('redisError1',err);
                    resolve(false);
                } else {
                    resolve(reply);
                }
            });
        });

        redisClient.on('error', function(err, response){
            redisClient.quit();
            console.log('redisError2',err);
            resolve(false);
        });
    });
};

/*
 Redis GET LIST key from, to
 - GET LIST KEY
 - 0 -1 will get all
 - return value | null
 */
appRedis.lrange = function(key,from,to){
    return new Promise(function (resolve, reject) {
        var redisClient = redis.createClient(appConfig.redis.port, appConfig.redis.host);
        redisClient.on('ready', function(){
            redisClient.lrange(key,from,to, function(err, reply) {
                redisClient.quit();
                if(err){
                    console.log('redisError1',err);
                    resolve(false);
                } else {
                    resolve(reply);
                }
            });
        });

        redisClient.on('error', function(err, response){
            redisClient.quit();
            console.log('redisError2',err);
            resolve(false);
        });
    });
};

/* Redis LPUSH
 - input VALUE | ARRAY
 - return false | length after push
 */
appRedis.lpush = function(key,values,cb){
    return new Promise(function (resolve, reject) {
        var redisClient = redis.createClient(appConfig.redis.port, appConfig.redis.host);
        redisClient.on('ready', function(){
            redisClient.lpush(key,values,function(err, reply) {
                redisClient.quit();
                if(err){
                    console.log('lpush',err);
                    return (cb) ? cb(false) : resolve(false);
                } else {
                    return (cb) ? cb(reply) : resolve(reply);
                }
            });
        });

        redisClient.on('error', function(err){
            redisClient.quit();
            console.log('lpush',err);
            return (cb) ? cb(false) : resolve(false);
        });
    });
};

/* Redis RPOP
 - GET AND REMOVE VALUE FROM LIST (the last element)
 - return value | null | false
 */
appRedis.rpop = function(key,cb){
    return new Promise(function (resolve, reject) {
        var redisClient = redis.createClient(appConfig.redis.port, appConfig.redis.host);
        redisClient.on('ready', function(){
            redisClient.rpop(key,function(err, reply) {
                redisClient.quit();
                if(err){
                    console.log('rpop',err);
                    return (cb) ? cb(false) : resolve(false);
                } else {
                    return (cb) ? cb(reply) : resolve(reply);
                }
            });
        });

        redisClient.on('error', function(err){
            redisClient.quit();
            console.log('rpop',err);
            return (cb) ? cb(false) : resolve(false);
        });
    });
};

/* Redis get the length of list
 - return length | false | 0 if key does not exist
 */
appRedis.llen = function(key,cb){
    return new Promise(function (resolve, reject) {
        var redisClient = redis.createClient(appConfig.redis.port, appConfig.redis.host);
        redisClient.on('ready', function(){
            redisClient.llen(key,function(err, reply) {
                redisClient.quit();
                if(err){
                    console.log('llen',err);
                    return (cb) ? cb(false) : resolve(false);
                } else {
                    return (cb) ? cb(reply) : resolve(reply);
                }
            });
        });

        redisClient.on('error', function(err){
            redisClient.quit();
            console.log('llen',err);
            return (cb) ? cb(false) : resolve(false);
        });
    });
};

/* Redis check remaining time of a key
 - return seconds | -2 if the key does not exist | -1 if the key exists but has no associated expire
 */
appRedis.remaining_time = function(key,cb) {
    return new Promise(function (resolve, reject) {
        //create client
        var redisClient = redis.createClient(appConfig.redis.port, appConfig.redis.host);
        redisClient.on('ready', function(){
            redisClient.ttl(key, function(err, reply) {
                redisClient.quit();
                if(err){
                    console.log('ttl',err);
                    return (cb) ? cb(err) : resolve(err);
                }else{
                    return (cb) ? cb(reply) : resolve(reply);
                }
            });
        });
        //catch error
        redisClient.on('error',function(err){
            redisClient.quit();
            console.log('ttl',err);
            return (cb) ? cb(err) :  resolve(err);
        });
    });
};

/* Redis get type of key
 - return string, list, set, zset, hash, stream | none
 */
appRedis.type = function(key,cb) {
    return new Promise(function (resolve, reject) {
        //create client
        var redisClient = redis.createClient(appConfig.redis.port, appConfig.redis.host);
        redisClient.on('ready', function(){
            redisClient.type(key, function(err, reply) {
                redisClient.quit();
                if(err){
                    console.log('type',err);
                    return (cb) ? cb(err) : resolve(err);
                }else{
                    return (cb) ? cb(reply) : resolve(reply);
                }
            });
        });
        //catch error
        redisClient.on('error',function(err){
            redisClient.quit();
            console.log('type',err);
            return (cb) ? cb(err) :  resolve(err);
        });
    });
};

/*
 Redis DEL key
 - DEL KEY
 */
appRedis.del = function (key){
    //create client
    var redisClient = redis.createClient(appConfig.redis.port, appConfig.redis.host);
    //catch error
    redisClient.on('error',function(err){
        redisClient.quit();
        console.log('redisDel',err);
    });

    redisClient.on('ready', function(){
        redisClient.del(key, function(err){
            //close connect
            redisClient.quit();
            console.log('redisDel',err);
        });
    });
};

/* 
Redis SET value into key
- SET KEY VALUE [EX seconds|PX milliseconds] [NX|XX|null]
- return callback(err | null)
*/
appRedis.append = function(options, callback){ 
    var key = options.key;
    var value = options.value;
    var expire = (options.expire) ? options.expire : 3600;

    //create client
    var redisClient = redis.createClient(appConfig.redis.port, appConfig.redis.host);
    //catch error
    redisClient.on('error',function(err){
        redisClient.quit();
        return callback(err);
    });

    redisClient.on('ready', function(){ 
        redisClient.append(key,value,function(err,reply){
            redisClient.quit();
            if(err)return callback(err);
            return callback(null);
        }); 
    });    
};

/* 
Redis GET multiple keys 
- input [ key1, key2, key3 ...] 
- return callback(err | null)
*/
appRedis.get_multiple = function(keys){
    return new Promise(function (resolve, reject) {
        //create client
        var redisClient = redis.createClient(appConfig.redis.port, appConfig.redis.host);
        //catch error
        redisClient.on('error',function(err){
            redisClient.quit();
            console.log('get_multiple',err);
            return resolve(false);
        });
        redisClient.on('ready', async function(){
            var multi = redisClient.multi();
            for(var i = 0 ; i<keys.length;i++){
                var ttt = await libs.redis.type(keys[i]);
                if(ttt == 'string'){
                    multi.get(keys[i]);
                }else if(ttt == 'list'){
                    multi.lrange(keys[i],0,-1);
                }else if(ttt == 'set'){
                    multi.smembers(keys[i]);
                }else if(ttt == 'hash'){
                    multi.hvals(keys[i]);
                }
            }
            multi.exec(function (err, replies) {
                redisClient.quit();
                if(err) {
                    console.log('get_multiple',err);
                    return resolve(false);
                }
                return resolve(replies);
            });
        });
    });
};

/*
 Redis GET keys with prefix
 - return callback(err,[ key1, key2, key3 ...])
 */
appRedis.list_keys = function(prefix){
    return new Promise(function (resolve, reject) {
        //create client
        var redisClient = redis.createClient(appConfig.redis.port, appConfig.redis.host);
        //catch error
        redisClient.on('error',function(err){
            redisClient.quit();
            console.log(err);
            return resolve(false);
        });

        redisClient.on('ready', function(){
            redisClient.keys(prefix+"*",function(err,replies){
                redisClient.quit();
                return (err) ? resolve(false) : resolve(replies);
            });
        });
    });
};

appRedis.exists = function(key, callback){
    //create client
    var redisClient = redis.createClient(appConfig.redis.port, appConfig.redis.host);
    //catch error
    redisClient.on('error',function(err){
        redisClient.quit();
        return callback(err);
    });

    redisClient.on('ready', function(){
        redisClient.exists(key, function(err, reply) {
            redisClient.quit();
            if(err){
                return callback(err);
            }
            return callback(true);
        });    
    });   
};

appRedis.incr = function(key,callback){
    //create client
    var redisClient = redis.createClient(appConfig.redis.port, appConfig.redis.host);
    //catch error
    redisClient.on('error',function(err){
        redisClient.quit();
        return callback(err);
    });

    redisClient.on('ready', function(){
        redisClient.incr(key, function(err, reply) {
            redisClient.expire(key, 86400);
            redisClient.quit();
            if(err){
                return callback(err);
            }
            return callback(err,reply);
        });    
    });    
};

/* 
Redis FLUSHDB 
- return callback(err, succeeded)
*/
appRedis.flush = function(callback){
    //create client
    var redisClient = redis.createClient(appConfig.redis.port, appConfig.redis.host);
    //catch error
    redisClient.on('error',function(err){
        redisClient.quit();
        return callback(err);
    });

    redisClient.on('ready', function(){
        redisClient.flushdb( function (err, succeeded) {
            redisClient.quit();
            return callback(err,succeeded);
        });
    });   
};

module.exports = appRedis;