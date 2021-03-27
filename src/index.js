const { Client, Pool } = require('pg');
const trap = require('./query');

module.exports = (callback) => {

    const nativeClientQueryFn = Client.prototype.query;
    const nativePoolQueryFn = Pool.prototype.query;

    Client.prototype.query = trap(nativeClientQueryFn, callback);
    Pool.prototype.query = trap(nativePoolQueryFn, callback);

    return {
        Client,
        Pool,
    }
}
