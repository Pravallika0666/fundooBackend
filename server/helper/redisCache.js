var redis = require('redis')
var client = redis.createClient()
client.on('connect', function () {
    console.log('connected')
})

client.on('error', (err) => {
    console.log('Error' + err)
})
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
exports.getRedis=(callback)=>{
    //get is used to get the value of key
    client.get(process.env.key,(err,data)=>{
        if(data){
            callback(null,data)
        }else{
            callback(err)
        }
    })
}