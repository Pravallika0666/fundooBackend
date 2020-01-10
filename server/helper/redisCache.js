var redis = require('redis')
var client = redis.createClient()
client.on('connect', function () {
    console.log('connected')
})

client.on('error', (err) => {
    console.log('Error' + err)
})

//set get and del redis are used to verify token
//exports set redis 
exports.setRedis = (value, callback) => {
    //set is used to hold the string value
    client.set(process.env.key, JSON.stringify(value), (err, result) => {
        if (result) {
            console.log("token set in cache", result);
            callback(null, result);

        } else {
            console.log("error in setting data");
            callback(err);
        }
    })
}

//exports get redis
exports.getRedis = (callback) => {
    //get is used to get the value of key
    client.get(process.env.key, (err, data) => {
        if (data) {
            callback(null, data)
        } else {
            callback(err)
        }
    })
}

//exports delete redis
exports.deleteRedis = () => {
    //del is used to remove the specified key
    client.del(process.env.key, (err, data) => {
        if (data) {
            console.log("delete data", data)
        } else {
            console.log('no data')
        }
    })

}

//set redis note is used to set the note 
//exports set redis note to the cache
exports.setRedisNote = (valueCache, callback) => {
    client.set(process.env.key + valueCache.id, JSON.stringify(valueCache.result), (err, result) => {
        if (result) {
            callback(null, result);
            console.log("Token is set", result);

        } else {
            callback(err);
            console.log("error");

        }
    })
}

//get redis note is used to get the data from the cache 
//exports get redis note 
exports.getRedisNote = (id, callback) => {
    client.get(process.env.key + id, JSON.stringify(id.result), (err, result) => {
        if (result) {
            callback(null, result)
            console.log("Gets the data", result)
        } else {
            callback(err)
            console.log("error");
        }
    })
}

//delete redis note is used to delete the note
//exports delete
exports.deleteRedisNote = (id, callback) => {
    client.del(process.env.key + id, JSON.stringify(id.result), (err, result) => {
        if(result){
            callback(null,result)
            console.log("delete the note from the cache",result)
        }else{
            callback(err)
            console.log("error")
        }
    })
}