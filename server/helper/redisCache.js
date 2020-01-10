var redis = require('redis')
var client = redis.createClient()
client.on('connect', function () {
    console.log('connected')
})

client.on('error', (err) => {
    console.log('Error' + err)
})

/**
 * Below three function used to store the token to verify
 **/

exports.setRedis = (val, callback) => {
    console.log("Vlaue------>",val);
    

    client.set(process.env.key, JSON.stringify(val), (err, result) => {
        if (result) {
            console.log("token set in cache", result);
            callback(null, result);

        } else {
            console.log("error in setting data");
            callback(err);
        }
    })
}

exports.getRedis = (callback) => {
    client.get(process.env.key, (err, data) => {
        if (data) {
            callback(null, data);
            // console.log("GET DATA-->");
        } else {
            callback(err);
            console.log("no data");

        }
    })
}
delRedis = () => {
    client.del(process.env.key, (err, data) => {
        if (data) {
            console.log("Data to delete", data);
        } else {
            console.log("no data");

        }
    })
}













//add cache
exports.addRedisCache = (data, callback) => {
    client.set(process.env.CACHEKEY, JSON.stringify(data), (err, data) => {
        if (err) {
            callback(err)
        } else {
            callback(null, data)
        }
    })
}
//get redis cache
exports.getRedisCache = (callback) => {
    client.get(process.env.CACHEKEY, (err, data) => {
        if (data) {
            let data1 = JSON.parse(data)
            callback(null, data1)
        } else {
            callback(err)
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
    console.log("HJIUY",process.env.CACHEKEY);
    
    client.get(process.env.CACHEKEY + id, (err, data) => {
        if (data) {
            console.log('ldjd',data);
            
            let data1 = JSON.parse(data)
            callback(null, data1)
            console.log('cached data')
        } else {
            callback(err)
            console.log("error")
        }
    })
}

//delete redis note is used to delete the note
//exports delete
exports.deleteRedisNote = (id, callback) => {
    client.del(process.env.CACHEKEY + id, (err, data) => {
        if (data) {
            callback(data)
            console.log("data deleted in cahce",data)
        } else {
            callback(err)
            console.log("error")
        }
    })
}