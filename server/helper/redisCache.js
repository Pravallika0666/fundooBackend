var redis = require('redis')
var client = redis.createClient(port, host)
client.on('connect', function () {
    console.log('connected')
})

client.on('error', (err) => {
    console.log('Error' + err)
})

exports.setRedis = (value, callback) => {
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

