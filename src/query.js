/**
* Monkey patch for query method
*
* A basic trap to allow the configured callback to receive the
* query args before calling the original query method with the
* original params.
*
* @param {Function} nativeFn
* @param {Function} callback
* @returns Function
*/
function query (nativeFn, callback) {

    /**
     * return an async function that replicates the interface
     * of the original query method
     */
    return async function (sql, params, ...args) {

       try {

           if (callback) {
               callback({
                   text: sql,
                   params,
               });
           }

           return await Reflect.apply(nativeFn, this, [sql, params, ...args]);

       } catch (err) {

           throw Error(err);
       }
   }
}

module.exports = query;
