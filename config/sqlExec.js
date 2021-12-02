let sqlExec = (dbConnect, {sql, timeout, values}) =>{
    return new Promise((resolve, reject)=>{
        dbConnect.query({
            sql: sql || null,
            timeout: timeout || 10000,
            values: values || null
        },  (error, results) => {
            if(error){
                return reject(error);
            }
            return resolve(results);
        });
    });
};

module.exports = sqlExec;