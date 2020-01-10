var redis = require('redis')
var client = redis.createClient()
client.on('connect', function () {
    console.log('connected')
})

client.on('error', (err) => {
    console.log('Error' + err)
})
//set redis note is used to set the note 
//exports set redis note to the cache
exports.setRedisNote = (valueCache, callback) => {
    client.set(process.env.KEY + valueCache.id, JSON.stringify(valueCache.result), (err, result) => {
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
    client.get(process.env.KEY + id, (err, result) => {
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
    client.del(process.env.KEY + id, (err, result) => {
        if (result) {
            callback(null, result)
            console.log("delete the note from the cache", result)
        } else {
            callback(err)
            console.log("error")
        }
    })
}