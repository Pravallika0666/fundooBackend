const model = require('../model/userModel')
const bcrypt = require('bcrypt')
const emailExistence = require('email-existence')
/**
 * @desc Gets the input from front end pass to model
 * @param request request contains all the requested data
 * @param callback sends the data back or err
 * @return responses with a http response
 */
exports.register = ((request, callback) => {
    model.users.findOne({ "email": request.body.email }, (err, data) => {
        if (data) callback("user exits");
        else {
            emailExistence.check(request.body.email, (err, result) => {

                if (!result) callback("provide valid email")
                else {
                    bcrypt.hash(request.body.password, 10, (err, encrypted) => {
                        var userDetails = new model.users({
                            "firstName":request.body.firstName,
                            "lastName":request.body.lastName,
                            "email":request.body.email,
                            "password":encrypted
                        })
                        userDetails.save((err, data) => {
                            if (err) {
                                callback(err);
                            } else callback(null, data);
                        })
                    })
                }
            })

        } console.log("model end")
    })
})
/**
 * @desc Gets the input from front end pass to model
 * @param request request contains all the requested data
 * @param callback sends the data back or err
 * @return responses with a http response
 */
exports.login = ((request, callback) => {
    model.users.findOne({ "email": request.body.email }, (err, data) => {
        if (data) {
            console.log("DATA PASSWORD_------>",data);
            
            bcrypt.compare(request.body.password, data.password, (err, success) => {
                if (success)
                    callback(null, data);
                else
                    callback("wrong Password");
            })
        }
        else
            callback("email doesnt match or exit")
    })
})
/**
 * @desc Gets the input from front end pass to model
 * @param request request contains all the requested data
 * @param callback sends the data back or err
 * @return responses with a http response
 */
//exports forgotpassword
exports.forgotpassword = ((request, callback) => {
    model.users.findOne({
        //checks the email in schema using findone
        "email": request.body.email
    }, (err, data) => {
        if (data) {
            callback(null, data)
        } else {
            callback("invalid user email ");
        }
    })
})