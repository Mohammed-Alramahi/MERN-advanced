const util = require('util');
const redis = require('redis');
const redisClient = redis.createClient(`${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`);


redisClient.set = util.promisify(redisClient.set);
redisClient.get = util.promisify(redisClient.get);

async function getCache(key) {
    const value = await redisClient.get(key);
    if (value) {
        return value;
    }
    return 0;
}

async function setCache(key, value) {
    try {
        return await redisClient.set(key, JSON.stringify(value));
    } catch (error) {
        console.log(error);
    }
}

module.exports = { getCache, setCache };