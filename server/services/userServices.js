const model = require('../model/userModel')
const bcrypt = require('bcrypt')
const emailExistence = require('email-existence')

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
