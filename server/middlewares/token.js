const jwt = require('jsonwebtoken');
const runnerRedis = require('../helper/redisCache')
    
exports.generateToken = (payload) => {
    {
        console.log('payload->',payload)
        const token = jwt.sign({ payload }, process.env.KEY, { expiresIn: '1h' }) // expires in 1 hour
        const obj = {
            success: true,
            message: 'Token Generated Successfully!!',
            token: token
        }
        return obj;
    }
}
exports.verify = (request, res, next) => {
    console.log("verifies request");
    var token = request.params.token;
    jwt.verify(token, process.env.KEY, (err, result) => {
        if (err) res.status(422).send({ message: "token is incorrect" });
        else {
            request.decoded = result;
            next();
        }
    })
}

exports.userVerify = (request, res, next) => {
    console.log("verifies request");

    runnerRedis.getRedis((err, data) => {

        console.log("Token in verify--",data);
        

        let newData = data.substring(1, data.length - 1);
        console.log("Token in login redis cache-->",newData);
        
        
        jwt.verify(newData, process.env.KEY, (err, result) => {
            if (err) res.status(422).send({ message: "token is incorrect" });
            else {
                request.decoded = result;
                console.log("reqqqqq",result)
                next();
            }
        })
    });
}






// exports.userVerify = (request, res, next) => {
//     console.log("verifies request");
//     var token = request.headers.token;
//     jwt.verify(token, process.env.KEY, (err, result) => {
//         if (err) res.status(422).send({ message: "token is incorrect" });
//         else {
//             request.decoded = result;
//             next();
//         }
//     })
// }