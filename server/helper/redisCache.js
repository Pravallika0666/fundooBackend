//redis is an in-memory key value store
var redis = require('redis')
//setting redis client
var client = redis.createClient()
client.on('connect', function () {
    console.log('connected')
})

client.on('error', (err) => {
    console.log('Error' + err)
})

//functions to store the token to verify using redis cache
exports.setRedisCache = (value, callback) => {
    //set is used to hold the value 
    client.set(process.env.key, JSON.stringify(value), (err, data) => {
        if (data) {
            console.log("token is set in cache", data);
            callback(null, data);

        } else {
            console.log("error in setting data");
            callback(err);
        }
    })
}

exports.getRedisCache = (callback) => {
    //get is used to get the value of key
    client.get(process.env.key, (err, data) => {
        if (data) {
            callback(null, data);
        } else {
            callback(err);
            console.log("no data");

        }
    })
}
exports.deleteRedisCache = () => {
    //delete is used to delete the redis cache
    client.del(process.env.key, (err, data) => {
        if (data) {
            console.log("Data to delete", data);
        } else {
            console.log("no data");

        }
    })
}
//set redis note is used to set the note 
//exports set redis note to the cache
exports.setRedisNote = (data, callback) => {
    client.set(process.env.CACHEKEY + data.id, JSON.stringify(data.notes), (err, data) => {
        if (err) {
            callback(err);
            console.log("error");

        } else {
            callback(null, data);
        }
    })
}

//get redis note is used to get the data from the cache 
//exports get redis note 
exports.getRedisNote = (id, callback) => {
    console.log("HJIUY", process.env.CACHEKEY);
    client.get(process.env.CACHEKEY + id, (err, data) => {
        if (data) {
            console.log('ldjd', data);

            let data1 = JSON.parse(data)
            callback(null, data1)
            // console.log('cached data')
        } else {
            callback(err)
            // console.log("error")
        }
    })
}

//delete redis note is used to delete the note
//exports delete
exports.deleteRedisNote = (id) => {
    client.del(process.env.CACHEKEY + id, (err, data) => {
        if (err) {
            console.log("error", err)
        } else {
            let data1 = JSON.parse(data)
            console.log("dataaaa", data1);
            console.log('data is cached')
        }
    })
}